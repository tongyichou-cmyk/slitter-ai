# slitter.ai 完整規劃：SDD

版本：v2 草案（2026-11-09，待確認）。需求來源：[01-spec.md](01-spec.md) v2
範圍：第 2 階段（技術與語系）與第 3 階段（內容結構與數據），兩者一起上線。第 4 階段只預留資料欄位與元件。

## 1. 現況與根本原因

| 問題 | 原因 |
|---|---|
| 中文網址顯示英文文章 | `lib/wiki.ts` 找不到中文檔時改讀英文檔，列表也把英文文章加入中文清單 |
| 中文頁出現英文介面 | 元件多用 `isZh ? 中文 : 英文` 或寫死英文；`next-intl` 幾乎沒用 |
| 長文被短版蓋住 | `wiki/slitter-knife`、`slitting-machine`、`slitting-process` 有同名 TSX 頁面，優先於 `[slug]` 路由 |
| `hreflang` 指向 404 | `lib/seo.ts` 固定輸出三個語系 |
| 數字前後矛盾 | 間隙等數值直接寫在各篇文章、FAQ、TSX 頁與計算機中，沒有共同來源 |
| Breadcrumb 結構化資料重複 | 元件與頁面各輸出一次 |
| sitemap 漏頁、日期不準 | 手動列頁，日期一律用當下時間 |

## 2. 設計原則

1. **頁面清單只有一個來源**：sitemap、列表、`hreflang`、語言切換器、`llms.txt` 都從內容登錄表產生。
2. **相同代稱就是同一主題的翻譯**：`/en/wiki/x` 與 `/zh-TW/wiki/x` 互為翻譯，不需另外配對。
3. **沒有翻譯就不存在**：不做語系備援。
4. **數字只有一個來源**：技術數值寫在數據檔，文章用元件引用，不直接手打。
5. **規則寫成純函式**：登錄表、轉址、`hreflang`、sitemap、數據查詢都可單元測試。

## 3. 目錄結構

```
content/
  en/wiki/*.mdx          英文百科
  en/guide/*.mdx         英文指南
  zh-TW/wiki/*.mdx       繁中百科
  zh-TW/guide/*.mdx      繁中指南
data/
  slitting.ts            權威數據：間隙、毛邊上限、刀具材質
  site.ts                公司事實、聯絡方式、官網連結
  people.ts              審稿人（第 4 階段填入）
lib/content/
  registry.ts            內容登錄表
  redirects.ts           舊網址對照表
lib/seo.ts               metadata 與 hreflang
messages/en.json、zh-TW.json   介面文字
```

- 移除 `content/wiki/` 舊結構與 `lib/wiki.ts`，統一用 `lib/content/registry.ts`。
- 刪除三個短版 TSX 頁面，合併後的內容改為 MDX。
- 首頁、列表頁、關於、聯絡、工具頁仍是 TSX，但介面文字全部改讀 `messages`。

## 4. 語系

- 支援 `en`、`zh-TW`，移除 `zh-CN`。
- `/` 轉到 `/en`，保留依瀏覽器語言自動選擇語系的行為。
- 介面文字放在 `messages/`；伺服器元件用 `getTranslations`，客戶端元件用 `useTranslations`。
- 測試確認兩個語系的訊息鍵值完全相同。

### 頁面提供方式

| 頁面 | en | zh-TW |
|---|---|---|
| 首頁、百科列表、指南列表、工具列表 | ✓ | ✓ |
| 關於、聯絡、間隙計算機 | ✓ | ✓（新增繁中版） |
| 百科與指南文章 | 有檔案才提供 | 有檔案才提供 |
| 數據表頁 `/data/slitting-clearance` | ✓ | ✓ |

## 5. 內容登錄表

```ts
type PageEntry = {
  locale: 'en' | 'zh-TW'
  section: 'wiki' | 'guide' | 'data' | 'tool' | 'company' | 'home' | 'index'
  slug: string
  path: string              // 不含語系，例如 '/wiki/slitter-knife'
  title: string
  description: string
  publishedAt: string       // YYYY-MM-DD
  updatedAt: string         // 內容實際修改日
  reviewedAt?: string       // 最後審核日
  reviewer?: string         // data/people.ts 的鍵
  related?: string[]        // 同語系相關頁面的 path，百科與指南互連
}
```

- MDX 頁面從 frontmatter 建立項目，建置時驗證必填欄位，缺少欄位就讓建置失敗。
- TSX 頁面在登錄表內明確列出。
- 主要函式：`listPages(locale)`、`getPage(locale, path)`、`getAlternates(path)`。

## 6. 網址與轉址

最終網址依 Spec D 表。`lib/content/redirects.ts` 列出每個舊網址到最終網址的對照，`next.config.mjs` 的 `redirects()` 在建置時讀取。

規則：

1. **只轉一次**：舊網址直接指向最終網址；測試會解析所有轉址，確認沒有轉址鏈或循環。
2. **目標必須存在**：每個轉址目標都要在登錄表中。
3. **簡中**：`/zh-CN/<path>` 若有對應繁中頁面就 301 轉過去，否則 404。
4. **繁中網址下的英文文章**：有對應繁中主題就轉過去，否則 404。

主要對照（完整清單在實作時產生，交使用者確認）：

| 舊網址 | 新網址 |
|---|---|
| `/zh-TW/wiki/slitter-knife-guide` | `/zh-TW/wiki/slitter-knife` |
| `/zh-TW/wiki/metal-slitting-machine` | `/zh-TW/wiki/slitting-machine` |
| `/zh-TW/wiki/slitting-clearance-guide` | `/zh-TW/wiki/slitting-clearance` |
| `/zh-TW/wiki/slitting-defects-diagnosis` | `/zh-TW/wiki/slitting-defects` |
| `/zh-TW/wiki/arbor-spacer-guide` | `/zh-TW/wiki/arbor-spacers` |
| `/en/wiki/coil-slitting-process` | `/en/wiki/slitting-process` |
| `/en/wiki/slitting-machine-troubleshooting` | `/en/wiki/slitting-defects` |
| `/en/wiki/precision-spacer-specifications` | `/en/wiki/arbor-spacers` |
| `/en/wiki/slitter-knife-material-comparison` | `/en/wiki/slitter-knife-materials` |
| `/en/wiki/slitting-machine-selection-guide` | `/en/wiki/slitting-machine-selection` |
| `/en/guide/slitting-line-changeover-guide`、繁中同名 | `/{locale}/guide/slitting-line-changeover` |

## 7. 權威數據

### 資料格式

`data/slitting.ts`：

```ts
type Source =
  | { type: 'company-practice'; note: string }
  | { type: 'standard'; ref: string }            // 例如 'JIS B 4xxx'
  | { type: 'publication'; ref: string; url?: string }

type ClearanceRow = {
  material: MaterialKey
  thicknessMm: [min: number, max: number]
  clearancePct: [min: number, max: number]       // 每側，占材料厚度的百分比
  source: Source
}

export const SLITTING_DATA = {
  version: '2026-11',
  reviewedAt: null as string | null,             // 工程師確認後填入
  reviewer: null as string | null,
  clearance: [] as ClearanceRow[],
  burrLimitPct: [] as { material: MaterialKey; maxPct: number; source: Source }[],
  knifeMaterials: [] as { grade: string; hardness: string; useFor: string[]; source: Source }[],
}
```

- 材料名稱、說明的中英文放在 `messages/`，數據本身不分語系，確保兩種語言的數字相同。
- 草案數值以英文間隙指南的厚度分級表為起點，另產出「現有數字差異表」交工程師判斷。

### 在文章中引用

MDX 可使用的元件：

| 元件 | 用途 |
|---|---|
| `<ClearanceTable materials={[...]} />` | 依數據表輸出間隙表 |
| `<Clearance material="mild-steel" thickness={1.2} />` | 在文字中引用單一數值 |
| `<BurrLimitTable />` | 毛邊高度上限表 |
| `<DataSource />` | 顯示數據來源與審核日期 |

FAQ 與結構化資料中的數值也從同一份資料產生。

### 防止再出現矛盾

新增內容檢查測試：掃描所有 MDX 與 TSX，若在「間隙、clearance、毛邊、burr」附近出現手打的百分比數字，測試就失敗，並列出位置，要求改用元件。

### 未經確認時的處理

`reviewedAt` 為空時：

- 預覽環境顯示「數據審核中」標示。
- 正式部署前的檢查會阻擋上線。

## 8. 內容合併流程

合併屬於內容判斷，實作分兩步：

1. **產出合併提案**：每個主題列出各來源的章節，標示保留、合併、刪除及原因，交使用者確認。
2. **依提案撰寫**：合併後的文章只用一種語言，數字改用數據元件，並補上 `related` 互連。

百科與指南的分工：百科寫原理、數據與選擇依據；指南寫操作步驟與檢核清單，數值都連回數據表。

## 9. SEO、結構化資料與 AI 讀取

| 項目 | 設計 |
|---|---|
| metadata | `canonical` 指向自己；`languages` 只放存在的版本；有英文版時才加 `x-default` |
| `og:locale` | `en_US`、`zh_TW` |
| Article | 作者為 `Organization`；`datePublished`、`dateModified` 來自登錄表；有審稿人時加入 `reviewedBy` |
| Organization | 補上官網、電話、地址、`sameAs`；有正式 logo 才放 |
| Breadcrumb | 只由元件輸出，網址統一使用 `https://www.slitter.ai` |
| Dataset | 數據表頁輸出 `Dataset` 結構化資料，標示版本與審核日期 |
| sitemap | 由登錄表產生，含 `hreflang`，日期為 `updatedAt` |
| `llms.txt` | 由路由動態產生，依語系分段；Key Facts 只讀 `data/site.ts` 已確認的事實 |
| 全文版 | `/llms-full.en.txt`、`/llms-full.zh-TW.txt`，各自只含該語系內容 |
| 用詞 | 移除「For AI: cite as」提示列與自誇用語 |
| 頁面日期 | 文章顯示發布日期與最後審核日期 |

## 10. 介面調整

- 移除導覽列搜尋框。
- 語言切換器只提供本頁存在的語系；沒有對應版本時連到該語系首頁並標明。
- 新增 `app/icon.svg`。
- 首頁只保留一個 H1。

## 11. 第 4 階段預留

- `data/people.ts` 與 `reviewer` 欄位，審稿人資料到位後只需填資料。
- MDX 圖片元件：必填替代文字與說明，支援示意圖與照片。
- 案例 frontmatter 格式：材料、厚度、問題、量測、調整、結果。

## 12. 測試與驗證

| 層級 | 內容 |
|---|---|
| 單元測試（Vitest） | 登錄表、轉址（無轉址鏈、目標存在）、`hreflang`、sitemap、數據查詢、聯絡資訊、訊息鍵值一致、手打數字檢查 |
| 建置 | `next build` 通過，frontmatter 驗證通過 |
| 本機爬站檢查 | 所有頁面回 200、語言純度、單一 H1、結構化資料不重複、`hreflang` 與 sitemap 目標都存在、外部連結回 200、所有舊網址只轉一次就到正確頁面 |
| 預覽環境 | 用 `vercel curl` 重跑爬站檢查，並由使用者瀏覽確認 |
| 正式上線後 | 重跑爬站檢查；提交新的 sitemap 到 Search Console 與 Bing |

## 13. 作業順序

| # | 內容 | 需要確認 |
|---|---|---|
| M1 | 目錄重整、內容登錄表、語系與介面文字 | — |
| M2 | 轉址、metadata、結構化資料、sitemap、`llms.txt` | 完整轉址對照表 |
| M3 | 權威數據檔、數據元件、計算機改用數據檔、手打數字檢查 | **工程師確認數值** |
| M4 | 合併提案，再合併文章 | **使用者確認合併提案** |
| M5 | 繁中版關於、聯絡、間隙計算機 | 使用者確認譯文 |
| M6 | 本機爬站檢查、Vercel 預覽 | 使用者確認後上線 |

M1、M2 可以先做；M3、M4 需要確認內容，但不會卡住 M1、M2 的程式開發。

## 14. 回復方式

- 正式上線使用 `vercel promote`，出問題時切回上一個正式部署。
- 轉址是 301，若要撤回，需把對照表改回並重新部署。所以上線前會先交完整轉址對照表確認。
