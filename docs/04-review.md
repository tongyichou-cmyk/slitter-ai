# 上線前確認清單

版本：2026-11-09。分支：`feature/i18n-content-v2`

程式部分（第 2 階段與第 3 階段的程式）已完成，並通過本機爬站檢查。以下 5 項要先確認，才能完成內容並正式上線。

| # | 項目 | 誰確認 | 狀態 |
|---|---|---|---|
| A | 轉址對照表 | 使用者 | 待確認 |
| B | 間隙數據 | 工程師 | 待確認，**未審核前上線檢查會擋下** |
| C | 文章合併方案 | 使用者 | 待確認 |
| D | 繁中新譯文：關於、聯絡、計算機、數據表 | 使用者 | 待確認 |
| E | 文章用語與無來源數字 | 使用者 | 待確認 |

---

## A. 轉址對照表

共 56 筆 301 轉址，全部一次到位。

### 改名的文章（23 筆）

| 舊網址 | 新網址 |
|---|---|
| `/en/wiki/slitter-knife-guide` | `/en/wiki/slitter-knife` |
| `/en/wiki/metal-slitting-machine` | `/en/wiki/slitting-machine` |
| `/en/wiki/slitting-defects-diagnosis` | `/en/wiki/slitting-defects` |
| `/en/wiki/arbor-spacer-guide` | `/en/wiki/arbor-spacers` |
| `/en/wiki/coil-slitting-process` | `/en/wiki/slitting-process` |
| `/en/wiki/slitting-machine-troubleshooting` | `/en/wiki/slitting-defects` |
| `/en/wiki/precision-spacer-specifications` | `/en/wiki/arbor-spacers` |
| `/en/wiki/slitter-knife-material-comparison` | `/en/wiki/slitter-knife-materials` |
| `/en/wiki/slitting-machine-selection-guide` | `/en/wiki/slitting-machine-selection` |
| `/en/guide/slitting-line-changeover-guide` | `/en/guide/slitting-line-changeover` |
| `/zh-TW/wiki/slitter-knife-guide` | `/zh-TW/wiki/slitter-knife` |
| `/zh-TW/wiki/metal-slitting-machine` | `/zh-TW/wiki/slitting-machine` |
| `/zh-TW/wiki/slitting-clearance-guide` | `/zh-TW/wiki/slitting-clearance` |
| `/zh-TW/wiki/slitting-defects-diagnosis` | `/zh-TW/wiki/slitting-defects` |
| `/zh-TW/wiki/arbor-spacer-guide` | `/zh-TW/wiki/arbor-spacers` |
| `/zh-TW/wiki/lightweight-vs-standard-spacers` | `/zh-TW/wiki/lightweight-spacers` |
| `/zh-TW/wiki/stripper-rings-guide` | `/zh-TW/wiki/stripper-rings` |
| `/zh-TW/wiki/hydraulic-nut-guide` | `/zh-TW/wiki/hydraulic-nut` |
| `/zh-TW/wiki/knife-regrinding-guide` | `/zh-TW/wiki/knife-regrinding` |
| `/zh-TW/wiki/tooling-installation-guide` | `/zh-TW/wiki/tooling-installation` |
| `/zh-TW/wiki/slitting-machine-troubleshooting` | `/zh-TW/wiki/slitting-defects` |
| `/zh-TW/wiki/precision-spacer-specifications` | `/zh-TW/wiki/arbor-spacers` |
| `/zh-TW/guide/slitting-line-changeover-guide` | `/zh-TW/guide/slitting-line-changeover` |

其中 `/en/wiki/slitter-knife-guide` 等 4 筆英文舊網址從未存在，只是規則自動產生，不影響網站。

### 簡中轉到繁中（33 筆）

所有有繁中版的簡中網址都轉到對應繁中頁面，包括舊代稱。

### 改為 404 的網址（8 筆）

這些是中文網址底下原本顯示英文文章、但沒有中文版的頁面。依「沒有翻譯就不提供」規則回應 404：

- `/zh-TW/wiki/coil-slitting-process`、`/zh-CN/wiki/coil-slitting-process`
- `/zh-TW/wiki/slitting-process`、`/zh-CN/wiki/slitting-process`
- `/zh-TW/wiki/slitter-knife-material-comparison`、`/zh-CN/wiki/slitter-knife-material-comparison`
- `/zh-TW/wiki/slitting-machine-selection-guide`、`/zh-CN/wiki/slitting-machine-selection-guide`

之後翻譯成繁中，這些網址會改成轉到新的繁中文章。

---

## B. 間隙數據（請工程師審核）

數據檔：`data/slitting.ts`。目前是草案，來自英文間隙指南原有的厚度分級表。

| 材料 | 厚度（mm） | 每側間隙（占厚度） |
|---|---|---|
| 低碳鋼（冷軋） | 0.3–0.8 | 5–8% |
| 低碳鋼（冷軋） | 0.8–2.0 | 7–10% |
| 低碳鋼（冷軋） | 2.0–4.0 | 9–12% |
| 不鏽鋼 304/316 | 0.3–1.5 | 4–7% |
| 不鏽鋼 304/316 | 1.5–4.0 | 6–9% |
| 鋁 | 0.5–2.0 | 6–10% |
| 銅、黃銅 | 0.3–1.5 | 5–8% |

### 請工程師回答

1. 上表數值是否正確？厚度分級是否合適？
2. 原本相對寫法的材料要不要加入，數值多少？
   - 高強度鋼 HSLA：原寫「比低碳鋼 +1–2%」
   - 先進高強度鋼 AHSS：原寫「+2–4%」
   - 矽鋼片：原寫「4–6%」
   - 鍍鋅鋼：原寫「比基材 +0.5–1%」
3. 毛邊高度上限要不要列入數據表？繁中間隙指南原寫冷軋碳鋼 ≤ 厚度 5%、不鏽鋼 ≤ 7%、鋁 ≤ 8%。
4. 審核人姓名與日期（會填入 `reviewer`、`reviewedAt`）。

### 目前文章中互相矛盾的數字

同樣是低碳鋼，現有文章寫了 5–8%、7–10%、8–10%、8–12%、9–12%、12% 等不同數值。工程師確認後，下表每一處都會改用數據元件，或標記為公式、算例等例外：

| 位置 | 數字 | 原文 |
|---|---|---|
| `content/en/guide/how-to-set-slitting-clearance.mdx:29` | 100% | Clearance % = (Total gap / Material thickness) × 100% |
| `content/en/guide/how-to-set-slitting-clearance.mdx:32` | 4% | When a 1.0mm steel coil is slit with a 0.02mm clearance per side (0.04mm total), the clear |
| `content/en/guide/how-to-set-slitting-clearance.mdx:70` | 8% | - Target clearance: 8% |
| `content/en/guide/how-to-set-slitting-clearance.mdx:108` | 15% | **Too shallow** (< 15%): Incomplete fracture, tearing, high burr |
| `content/en/guide/how-to-set-slitting-clearance.mdx:145` | 1–1.5% | **Fix:** Decrease clearance by 1–1.5% and re-test |
| `content/en/guide/how-to-set-slitting-clearance.mdx:149` | 1% | **Fix:** Increase clearance by 1% and re-test |
| `content/en/guide/how-to-set-slitting-clearance.mdx:153` | 1–2% | **Fix:** Increase clearance 1–2% |
| `content/en/guide/how-to-set-slitting-clearance.mdx:181` | 4–6% | Stainless work-hardens rapidly as the knife penetrates. Use knife grades of M42 or carbide |
| `content/en/guide/how-to-set-slitting-clearance.mdx:184` | 2–4% | Springback causes the slit edge to press back toward the knife after cutting. Use **2–4% m |
| `content/en/guide/how-to-set-slitting-clearance.mdx:187` | 4–6% | The abrasive silicon particles accelerate knife wear. Use carbide knives when possible. Ke |
| `content/en/guide/slitting-line-changeover.mdx:155` | 5% | - Inspect burr height on slit edges (target ≤ 5% of thickness for steel) |
| `content/en/wiki/slitter-knife.mdx:27` | 4–6%、6–10% | 4–6%, electrical steel 6–10%. Clearance is set as a percentage of material |
| `content/en/wiki/slitter-knife.mdx:33` | 10% | burr height. A practical trigger is strip burr height exceeding 10% of |
| `content/en/wiki/slitter-knife.mdx:214` | 5–8%、4–6% | 8–12% of thickness for mild carbon steel; 10–15% for stainless; 5–8% for aluminum; 4–6% fo |
| `content/en/wiki/slitter-knife.mdx:217` | 10% | When strip burr height exceeds 10% of material thickness, or when edge rollover is visible |
| `content/en/wiki/slitting-defects.mdx:59` | 6-10% | For austenitic stainless (304/316), recommended knife clearance is 6-10% |
| `content/en/wiki/slitting-defects.mdx:95` | 1–2%、5–8%、6–10% | *Corrective action:* Reduce clearance by 1–2% of material thickness and re-run test strip. |
| `content/en/wiki/slitting-defects.mdx:134` | 1–2% | *Corrective action:* Increase clearance by 1–2% of material thickness. Re-run test strip a |
| `content/en/wiki/slitting-machine-selection.mdx:127` | 8–12% | **Carbon steel (CR/HR):** Standard workhorse application. D2 or M2 tool steel knives are a |
| `content/en/wiki/slitting-machine-selection.mdx:129` | 10–15% | **Stainless steel:** Higher cutting forces demand carbide knives or premium HSS. Clearance |
| `content/en/wiki/slitting-machine-selection.mdx:131` | 5–8% | **Aluminum and aluminum alloy:** Soft material with tendency to gall onto knife faces. Cle |
| `content/en/wiki/slitting-machine-selection.mdx:133` | 4–6% | **Copper and copper alloys:** Low clearance (4–6%) required for clean edge. Carbide knives |
| `content/en/wiki/slitting-process.mdx:109` | 12% | **Example:** 1.5 mm stainless steel at 12% clearance = 0.18 mm horizontal gap per knife pa |
| `content/en/wiki/slitting-process.mdx:219` | 20–40% | The depth of material that deforms downward before fracture. Rollover is acceptable in con |
| `content/en/wiki/slitting-process.mdx:249` | 10%、10% | For a new material or knife combination, run a clearance sensitivity test: slit 5 test pas |
| `content/zh-TW/guide/how-to-set-slitting-clearance.mdx:25` | 100% | 間隙 % = （單側間距 × 2）/ 材料厚度 × 100% |
| `content/zh-TW/guide/how-to-set-slitting-clearance.mdx:64` | 8% | - 目標間隙：8% |
| `content/zh-TW/guide/how-to-set-slitting-clearance.mdx:103` | 15% | **深度過淺**（< 15%）：裂縫無法完整貫穿，出現撕裂、毛邊 |
| `content/zh-TW/guide/how-to-set-slitting-clearance.mdx:145` | 1–1.5% | **處置：** 縮小間隙 1–1.5%，重新試切 |
| `content/zh-TW/guide/how-to-set-slitting-clearance.mdx:149` | 1% | **處置：** 放大間隙 1%，重新試切 |
| `content/zh-TW/guide/how-to-set-slitting-clearance.mdx:153` | 1–2% | **處置：** 放大間隙 1–2% |
| `content/zh-TW/guide/how-to-set-slitting-clearance.mdx:181` | 4–6% | 不鏽鋼加工硬化速率快，刀刃切入後材料硬度迅速上升。建議使用 M42 鈷高速鋼或硬質合金刀具，間隙取範圍下限（4–6%），並確保切割區有充足的切削油冷卻，防止燒結。 |
| `content/zh-TW/guide/how-to-set-slitting-clearance.mdx:184` | 2–4% | AHSS 切割後的回彈量遠大於普通高強度鋼。若以傳統碳鋼間隙設定，切口會過度承受側向力，導致微裂紋和刀刃崩損。**在同厚度碳鋼基礎上加 2–4% 間隙**以補償回彈效應。 |
| `content/zh-TW/guide/how-to-set-slitting-clearance.mdx:187` | 4–6% | 矽鋼中的矽粒子磨蝕性強，優先使用硬質合金刀具。保持較緊間隙（4–6%），避免斷裂帶粗糙引起衝壓微裂紋。鬆間隙在矽鋼上的危害遠大於其他材料。 |
| `content/zh-TW/guide/slitting-line-changeover.mdx:168` | 5% | - 量測毛邊高度（鋼料目標 ≤ 厚度 5%） |
| `content/zh-TW/wiki/slitter-knife.mdx:194` | 12% | 切割 1.5mm 不鏽鋼 304，採用 12% 間隙： |
| `content/zh-TW/wiki/slitter-knife.mdx:196` | 12% | 水平間隙 = 1.5mm × 12% = 0.18mm（每對刀片） |
| `content/zh-TW/wiki/slitter-knife.mdx:241` | 10% | ／ 毛邊高度超過材料厚度 10% ／ 刀刃磨損、間隙設定過小 ／ |
| `content/zh-TW/wiki/slitter-knife.mdx:251` | 8–10% | - 毛邊高度超過材料厚度 8–10% |
| `content/zh-TW/wiki/slitting-clearance.mdx:22` | 5–8% | AHSS 的強度高、回彈大，實際有效間隙小於設定值。建議在計算間隙時增加 5–8% 的補償量，並進行間隙優化試驗確認最佳設定。刀片需使用 PM |
| `content/zh-TW/wiki/slitting-clearance.mdx:31` | 5–10% | 會的，特別是不鏽鋼和高強鋼。同種材料不同批次，熱處理狀態和實際硬度可能有 ±5–10% 的差異，對應最佳間隙可能差 |
| `content/zh-TW/wiki/slitting-clearance.mdx:32` | 2–4% | 2–4%。建議每次新批次料到廠時，至少快速試切確認一次毛邊品質，有偏差再微調間隙。 |
| `content/zh-TW/wiki/slitting-clearance.mdx:39` | 80% | 很多工廠面對毛邊問題的第一反應是「換刀」，卻忽略了更根本的原因——**間隙設定錯誤**。根據道德煜企業超過半世紀的分條刀具服務經驗，80% 以上的切口品質問題，都可以透過正確的間隙 |
| `content/zh-TW/wiki/slitting-clearance.mdx:75` | 12% | 例：切割 1.5mm 不鏽鋼 304，採用 12% 間隙： |
| `content/zh-TW/wiki/slitting-clearance.mdx:77` | 12% | 水平間隙 = 1.5mm × 12% = 0.18mm |
| `content/zh-TW/wiki/slitting-clearance.mdx:85` | 10–12% | ／ 熱軋鋼（HR） ／ 10–12% ／ 熱軋鋼表面較粗，略大間隙 ／ |
| `content/zh-TW/wiki/slitting-clearance.mdx:88` | 10–15% | ／ 不鏽鋼 304/316 ／ 10–15% ／ 加工硬化顯著，需較大間隙 ／ |
| `content/zh-TW/wiki/slitting-clearance.mdx:89` | 12–16% | ／ 馬氏體不鏽鋼 420/440 ／ 12–16% ／ 硬度高，間隙更大 ／ |
| `content/zh-TW/wiki/slitting-clearance.mdx:90` | 5–8% | ／ 鋁合金 ／ 5–8% ／ 軟材，小間隙確保光滑切面 ／ |
| `content/zh-TW/wiki/slitting-clearance.mdx:91` | 4–6% | ／ 純銅 ／ 4–6% ／ 超軟材，最小間隙 ／ |
| `content/zh-TW/wiki/slitting-clearance.mdx:94` | 10–14% | ／ AHSS 高強鋼 ／ 10–14% ／ 高強度需較大間隙 ／ |
| `content/zh-TW/wiki/slitting-clearance.mdx:95` | 12–18% | ／ UHSS 超高強鋼 ／ 12–18% ／ 最大間隙範圍 ／ |
| `content/zh-TW/wiki/slitting-clearance.mdx:96` | 1–3% | ／ PET/BOPP 薄膜 ／ 1–3% ／ 非金屬材料，極小間隙 ／ |
| `content/zh-TW/wiki/slitting-clearance.mdx:144` | 6–10% | - 嚴格控制間隙在 6–10% 範圍內 |
| `content/zh-TW/wiki/slitting-clearance.mdx:219` | 20% | ／ -20% 基準 ／ 0.144mm ／ 觀察過小間隙表現 ／ |
| `content/zh-TW/wiki/slitting-clearance.mdx:223` | 20% | ／ +20% 基準 ／ 0.216mm ／ 觀察過大間隙表現 ／ |
| `content/zh-TW/wiki/slitting-clearance.mdx:235` | 1.3% | 如果間隔環公差 ±0.01mm，每次安裝刀組時，實際間隙的變化範圍可能超過 0.02mm。以切割 1.5mm 不鏽鋼為例，0.02mm 的間隙變化相當於 1.3% 的間隙偏移，完全 |
| `content/zh-TW/wiki/slitting-clearance.mdx:256` | 40% | 超過 40%：間隙過大，或刀片磨耗 |
| `content/zh-TW/wiki/slitting-clearance.mdx:257` | 10% | 低於 10%：間隙過小，或壓入量過大 |
| `content/zh-TW/wiki/slitting-clearance.mdx:263` | 20% | - 間隙過大：光潔帶 < 20%，斷裂帶占主體 |
| `content/zh-TW/wiki/slitting-clearance.mdx:264` | 85% | - 間隙過小：光潔帶 > 85%，帶有二次剪切亮帶 |
| `content/zh-TW/wiki/slitting-clearance.mdx:274` | 5–8% | AHSS 回彈大，有效間隙小於設定值，需增加 5–8% 補償量，搭配精密間隔環和硬質合金刀片。 |
| `content/zh-TW/wiki/slitting-defects.mdx:21` | 80% | 量測刀軸跳動量。不要第一反應就換刀——80% 的毛邊問題是間隙設定問題，而不是刀具問題。 |
| `content/zh-TW/wiki/slitting-defects.mdx:326` | 80% | 先看缺陷分佈：所有條帶均有 → 查間隙設定；特定條帶 → 查對應刀對；週期性 → 量測跳動量。80% 毛邊問題是間隙問題，不是刀具問題。 |

---

## C. 文章合併方案

### 分條刀 `/en/wiki/slitter-knife`

- **保留**：長文 MDX 全文（約 11,900 字元），已涵蓋短版 TSX 的所有主題。
- **刪除**：短版 TSX（約 6,500 字元）。
- **調整**：「Material Grades」縮短為摘要並連到「分條刀材質」頁，避免兩頁重複；間隙段落改用數據元件。

### 分條機 `/en/wiki/slitting-machine`

- **保留**：長文 MDX 全文。
- **刪除**：短版 TSX。短版談的是軟包裝與紙類的分條機（log slitter、rewind slitter），和網站的金屬分條主題不符。

### 分條製程 `/en/wiki/slitting-process`

以 `slitting-process` 的 6 個步驟為主幹，併入 `coil-slitting-process` 中不重複的部分：

| 來源章節 | 處理 |
|---|---|
| Stage 1 進料檢驗（鋼捲識別、材質證明、外觀檢查） | **新增**為第一步 |
| Stage 2 鋼套組裝 | 併入「Knife Arbor Setup」 |
| Stage 3 穿料、Stage 4 製程參數 | 與現有步驟重複，保留較完整的一份 |
| Stage 7 最終檢驗與標示 | **新增**為最後一步 |
| Common Process Deviations | 縮短為摘要，連到「分條缺陷」頁 |
| Step 6 換線 | 縮短為摘要，連到「換線指南」 |
| 短版 TSX | 刪除，內容已涵蓋 |

合併後約 16,000–18,000 字元。合併稿完成後會先給你看，再上線。

---

## D. 繁中新譯文

以下頁面原本只有英文，這次新增繁中版，文字在 `messages/zh-TW.json`：

- 關於（`about`）：公司資料與「我們怎麼寫」
- 聯絡（`contact`）：繁中頁顯示 LINE、Email、電話，不顯示 WhatsApp
- 間隙計算機（`calculator`、`materials`）
- 數據表（`data`）

可以在預覽網址直接看。

**「我們怎麼寫」已改寫成符合現況的說法。** 原本的英文版寫「所有說法都可追溯到 JIS、DIN、ASTM 標準或外部來源」，但目前文章沒有列出任何來源。這段改成：文章由技術團隊撰寫、數字來自同一份數據表，並說明正在補上審稿人和來源。

---

## E. 文章用語與無來源數字

| 位置 | 內容 | 建議 |
|---|---|---|
| `content/en/wiki/slitter-knife.mdx` | 描述寫「definitive technical reference」 | 改成具體描述 |
| `content/en/wiki/slitter-knife-materials.mdx` | 「3–8× longer tool life than HSS」等壽命倍數 | 沒有來源就改成文字比較，例如「在磨耗性材料上明顯較長」 |
| 多篇文章 | 「鋰電池隔離膜」、「膜材」相關的精度與間隙 | 網站主題是金屬分條，沒有來源就刪除 |
