import { readFile, writeFile } from "node:fs/promises";

const [input, output] = process.argv.slice(2);

if (!input || !output) {
  throw new Error("Usage: node scripts/recolor-brain-svg.mjs <input.svg> <output.svg>");
}

const clamp = (value, minimum = 0, maximum = 1) => Math.max(minimum, Math.min(maximum, value));

const hexToRgb = (hex) => ({
  red: Number.parseInt(hex.slice(1, 3), 16),
  green: Number.parseInt(hex.slice(3, 5), 16),
  blue: Number.parseInt(hex.slice(5, 7), 16),
});

const rgbToHsl = ({ red, green, blue }) => {
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;
  const maximum = Math.max(r, g, b);
  const minimum = Math.min(r, g, b);
  const chroma = maximum - minimum;
  const lightness = (maximum + minimum) / 2;
  let hue = 0;

  if (chroma) {
    if (maximum === r) hue = ((g - b) / chroma) % 6;
    else if (maximum === g) hue = ((b - r) / chroma) + 2;
    else hue = ((r - g) / chroma) + 4;
  }

  const saturation = chroma === 0 ? 0 : chroma / (1 - Math.abs((2 * lightness) - 1));
  return { hue: (hue * 60 + 360) % 360, saturation, lightness };
};

const hslToHex = ({ hue, saturation, lightness }) => {
  const chroma = (1 - Math.abs((2 * lightness) - 1)) * saturation;
  const segment = hue / 60;
  const second = chroma * (1 - Math.abs((segment % 2) - 1));
  let red = 0;
  let green = 0;
  let blue = 0;

  if (segment < 1) [red, green] = [chroma, second];
  else if (segment < 2) [red, green] = [second, chroma];
  else if (segment < 3) [green, blue] = [chroma, second];
  else if (segment < 4) [green, blue] = [second, chroma];
  else if (segment < 5) [red, blue] = [second, chroma];
  else [red, blue] = [chroma, second];

  const match = lightness - (chroma / 2);
  return `#${[red, green, blue]
    .map((channel) => Math.round((channel + match) * 255).toString(16).padStart(2, "0"))
    .join("")}`.toUpperCase();
};

const hueDistance = (left, right) => {
  const distance = Math.abs(left - right);
  return Math.min(distance, 360 - distance);
};

const palettes = [
  { source: "#D5BE94", target: "#D4AE62" },
  { source: "#D28FB0", target: "#B83225" },
  { source: "#99C0A2", target: "#6C9F5E" },
  { source: "#9194B6", target: "#566B73" },
  { source: "#C9918E", target: "#A26852" },
].map((palette) => ({
  source: rgbToHsl(hexToRgb(palette.source)),
  target: rgbToHsl(hexToRgb(palette.target)),
}));

const svg = await readFile(input, "utf8");
const recolored = svg.replace(/fill="(#[0-9A-Fa-f]{6})"/g, (match, hex) => {
  const rgb = hexToRgb(hex);
  const maximum = Math.max(rgb.red, rgb.green, rgb.blue);
  const minimum = Math.min(rgb.red, rgb.green, rgb.blue);
  if (maximum < 38 || maximum - minimum < 8) return match;

  const color = rgbToHsl(rgb);
  const palette = palettes.reduce((nearest, candidate) => (
    hueDistance(color.hue, candidate.source.hue) < hueDistance(color.hue, nearest.source.hue)
      ? candidate
      : nearest
  ));

  const saturationRatio = palette.source.saturation
    ? color.saturation / palette.source.saturation
    : 1;
  const remapped = {
    hue: palette.target.hue,
    saturation: clamp(palette.target.saturation * (0.62 + (0.38 * saturationRatio)), 0.16, 0.92),
    lightness: clamp(palette.target.lightness + ((color.lightness - palette.source.lightness) * 0.9), 0.07, 0.92),
  };

  return `fill="${hslToHex(remapped)}"`;
});

await writeFile(output, recolored);
