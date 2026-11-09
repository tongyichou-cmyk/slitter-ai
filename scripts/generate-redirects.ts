// 建置前產生 .generated/redirects.json，供 next.config.mjs 的 redirects() 讀取。
import fs from 'fs'
import path from 'path'
import { buildNextRedirects } from '@/lib/content/redirects'

const rules = buildNextRedirects()
const out = path.join(process.cwd(), '.generated', 'redirects.json')
fs.mkdirSync(path.dirname(out), { recursive: true })
fs.writeFileSync(out, JSON.stringify(rules, null, 2) + '\n')
console.log(`redirects: ${rules.length} 筆 → ${path.relative(process.cwd(), out)}`)
