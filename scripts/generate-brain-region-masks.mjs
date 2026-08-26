import sharp from "sharp";

const source = process.argv[2];
const outputDirectory = process.argv[3];

if (!source || !outputDirectory) {
  throw new Error("Usage: node scripts/generate-brain-region-masks.mjs <brain.png> <output-directory>");
}

const regions = [
  { id: "curiosity", hue: 40 },
  { id: "connections", hue: 332 },
  { id: "structure", hue: 135 },
  { id: "source", hue: 235 },
  { id: "direction", hue: 2 },
];

const { data, info } = await sharp(source)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const pixelCount = info.width * info.height;
const labels = new Int8Array(pixelCount);
labels.fill(-1);
const visible = new Uint8Array(pixelCount);
const sourceAlpha = new Uint8Array(pixelCount);
const queue = new Int32Array(pixelCount);
let queueStart = 0;
let queueEnd = 0;

const hueDistance = (left, right) => {
  const distance = Math.abs(left - right);
  return Math.min(distance, 360 - distance);
};

const rgbToHue = (red, green, blue) => {
  const maximum = Math.max(red, green, blue);
  const minimum = Math.min(red, green, blue);
  const chroma = maximum - minimum;
  if (chroma === 0) return 0;

  let hue;
  if (maximum === red) hue = ((green - blue) / chroma) % 6;
  else if (maximum === green) hue = ((blue - red) / chroma) + 2;
  else hue = ((red - green) / chroma) + 4;
  return (hue * 60 + 360) % 360;
};

for (let pixel = 0; pixel < pixelCount; pixel += 1) {
  const offset = pixel * 4;
  const red = data[offset];
  const green = data[offset + 1];
  const blue = data[offset + 2];
  const alpha = data[offset + 3];

  sourceAlpha[pixel] = alpha;
  if (alpha < 8) continue;
  visible[pixel] = 1;

  const maximum = Math.max(red, green, blue);
  const minimum = Math.min(red, green, blue);
  const chroma = maximum - minimum;

  // The supplied engraving uses five distinct colour families. Dark ink is
  // assigned below from the nearest coloured neighbour so its fine lines stay
  // attached to the correct lobe.
  if (maximum < 42 || chroma < 9) continue;

  const hue = rgbToHue(red, green, blue);
  let bestRegion = 0;
  let bestDistance = Number.POSITIVE_INFINITY;

  regions.forEach((region, index) => {
    const distance = hueDistance(hue, region.hue);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestRegion = index;
    }
  });

  labels[pixel] = bestRegion;
  queue[queueEnd] = pixel;
  queueEnd += 1;
}

if (queueEnd === 0) throw new Error("No coloured brain pixels were found.");

const enqueue = (pixel, label) => {
  if (!visible[pixel] || labels[pixel] !== -1) return;
  labels[pixel] = label;
  queue[queueEnd] = pixel;
  queueEnd += 1;
};

while (queueStart < queueEnd) {
  const pixel = queue[queueStart];
  queueStart += 1;
  const label = labels[pixel];
  const x = pixel % info.width;
  const y = Math.floor(pixel / info.width);

  if (x > 0) enqueue(pixel - 1, label);
  if (x + 1 < info.width) enqueue(pixel + 1, label);
  if (y > 0) enqueue(pixel - info.width, label);
  if (y + 1 < info.height) enqueue(pixel + info.width, label);
}

await Promise.all(regions.map(async (region, regionIndex) => {
  const mask = Buffer.alloc(pixelCount * 4);

  for (let pixel = 0; pixel < pixelCount; pixel += 1) {
    if (labels[pixel] !== regionIndex) continue;
    const offset = pixel * 4;
    mask[offset] = 255;
    mask[offset + 1] = 255;
    mask[offset + 2] = 255;
    mask[offset + 3] = sourceAlpha[pixel];
  }

  await sharp(mask, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9, palette: true, colours: 4 })
    .toFile(`${outputDirectory}/brain-mask-${region.id}.png`);
}));

process.stdout.write(`Generated ${regions.length} masks at ${info.width}x${info.height}.\n`);
