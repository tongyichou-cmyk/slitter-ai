import sharp from 'sharp'
import { existsSync, renameSync, unlinkSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

const SOURCE = 'slitter-machine-hero-src.jpg'  // master source — never overwritten

// Output specs per image
const targets = [
  {
    src: SOURCE,
    filename: 'slitter-machine-hero.jpg',
    width: 1920,   // full-bleed banner, 2× retina
    height: 640,   // banner aspect ratio
    quality: 82,
  },
  {
    src: SOURCE,
    filename: 'og-default.jpg',
    width: 1200,   // OG spec
    height: 630,   // OG spec
    quality: 85,
  },
]

const WATERMARK_TEXT = 'www.slitterline.com'

async function processImage({ src, filename, width, height, quality }) {
  const inputPath = join(publicDir, src)
  const outputPath = join(publicDir, filename)

  if (!existsSync(inputPath)) {
    console.warn(`Skipping ${filename} — file not found`)
    return
  }

  const beforeSize = statSync(inputPath).size
  if (!existsSync(outputPath)) { /* first run, no before-size from output */ }

  // Build SVG overlay sized to OUTPUT dimensions
  const fontSize = Math.max(14, Math.round(width * 0.018))
  const padding = Math.round(width * 0.015)
  const approxTextWidth = WATERMARK_TEXT.length * fontSize * 0.62

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <rect
      x="${width - approxTextWidth - padding * 2}"
      y="${height - fontSize * 1.8 - padding}"
      width="${approxTextWidth + padding * 2}"
      height="${fontSize * 1.4 + padding}"
      fill="rgba(0,0,0,0.5)"
      rx="3"
    />
    <text
      x="${width - padding - approxTextWidth / 2}"
      y="${height - padding - fontSize * 0.2}"
      font-family="Arial, sans-serif"
      font-size="${fontSize}"
      fill="rgba(255,255,255,0.9)"
      text-anchor="middle"
      dominant-baseline="auto"
    >${WATERMARK_TEXT}</text>
  </svg>`

  const svgBuffer = Buffer.from(svg)
  const tmpPath = outputPath + '.tmp.jpg'

  await sharp(inputPath)
    .resize(width, height, { fit: 'cover', position: 'center' })
    .composite([{ input: svgBuffer, blend: 'over' }])
    .jpeg({ quality, mozjpeg: true })
    .toFile(tmpPath)

  try { unlinkSync(outputPath) } catch {}
  renameSync(tmpPath, outputPath)

  const afterSize = statSync(outputPath).size
  const reduction = (((beforeSize - afterSize) / beforeSize) * 100).toFixed(0)
  console.log(
    `✓ ${filename}  ${width}×${height}  ${(afterSize / 1024).toFixed(0)} KB  (-${reduction}%)`
  )
}

for (const target of targets) {
  await processImage(target)
}
