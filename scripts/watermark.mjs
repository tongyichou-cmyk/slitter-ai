import sharp from 'sharp'
import { existsSync, renameSync, unlinkSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

const targets = [
  'slitter-machine-hero.jpg',
  'og-default.jpg',
]

const WATERMARK_TEXT = 'www.slitterline.com'

async function addWatermark(filename) {
  const inputPath = join(publicDir, filename)
  const outputPath = join(publicDir, filename)

  if (!existsSync(inputPath)) {
    console.warn(`Skipping ${filename} — file not found`)
    return
  }

  const image = sharp(inputPath)
  const meta = await image.metadata()
  const { width, height } = meta

  // Build SVG text overlay (bottom-right, semi-transparent)
  const fontSize = Math.max(18, Math.round(width * 0.022))
  const padding = Math.round(width * 0.018)
  const approxTextWidth = WATERMARK_TEXT.length * fontSize * 0.6

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <rect
      x="${width - approxTextWidth - padding * 2}"
      y="${height - fontSize * 2 - padding}"
      width="${approxTextWidth + padding * 2}"
      height="${fontSize + padding}"
      fill="rgba(0,0,0,0.45)"
      rx="3"
    />
    <text
      x="${width - padding - approxTextWidth / 2}"
      y="${height - fontSize - padding + fontSize * 0.8}"
      font-family="monospace"
      font-size="${fontSize}"
      fill="rgba(245,196,0,0.85)"
      text-anchor="middle"
      dominant-baseline="auto"
    >${WATERMARK_TEXT}</text>
  </svg>`

  const svgBuffer = Buffer.from(svg)

  // Write to a temp buffer then overwrite original
  const tmpPath = outputPath + '.tmp.jpg'

  await sharp(inputPath)
    .composite([{ input: svgBuffer, blend: 'over' }])
    .jpeg({ quality: 88 })
    .toFile(tmpPath)

  // Atomically replace original
  try { unlinkSync(outputPath) } catch {}
  renameSync(tmpPath, outputPath)

  console.log(`✓ Watermarked: ${filename}`)
}

for (const target of targets) {
  await addWatermark(target)
}
