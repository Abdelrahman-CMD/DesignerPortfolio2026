import sharp from "sharp";

const [source, output] = process.argv.slice(2);
const left = Number.parseInt(process.argv[4] ?? "326", 10);
const top = Number.parseInt(process.argv[5] ?? "70", 10);
const width = Number.parseInt(process.argv[6] ?? "1044", 10);
const height = Number.parseInt(process.argv[7] ?? "932", 10);
const cutoff = Number.parseInt(process.argv[8] ?? "812", 10);

if (!source || !output) {
  throw new Error("Usage: node scripts/generate-brain-head-clip.mjs <portrait.png> <output.png> [left top width height cutoff]");
}

const { data, info } = await sharp(source)
  .extract({ left, top, width, height })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const mask = Buffer.alloc(info.width * info.height * 4);

for (let y = 0; y < info.height; y += 1) {
  for (let x = 0; x < info.width; x += 1) {
    const offset = (y * info.width + x) * 4;
    const alpha = y < cutoff ? data[offset + 3] : 0;
    mask[offset] = 255;
    mask[offset + 1] = 255;
    mask[offset + 2] = 255;
    mask[offset + 3] = alpha;
  }
}

await sharp(mask, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png({ compressionLevel: 9, palette: true, colours: 16 })
  .toFile(output);
