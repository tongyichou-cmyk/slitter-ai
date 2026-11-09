// 正式上線前執行：數據必須已審核，內容品質測試必須全部通過。
import { execSync } from 'child_process'
import { assertPublishable } from '@/data/slitting'

assertPublishable()
execSync('npx vitest run', { stdio: 'inherit' })
console.log('上線前檢查通過')
