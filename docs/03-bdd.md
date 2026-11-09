# slitter.ai 完整規劃：BDD

版本：v2 草案（2026-11-09，待確認）。依據：[01-spec.md](01-spec.md) v2、[02-sdd.md](02-sdd.md) v2

每個場景標註對應需求與驗證方式：**單元**（Vitest）、**爬站**（本機、預覽或正式網址自動檢查）、**人工**（使用者確認）。

```gherkin
# language: zh-TW

功能: 語系完全分離
  網站只提供英文與繁體中文，兩者的內容與介面完全分開。

  場景: 相同代稱的中英文頁面互為翻譯                        # SDD 原則 2 單元
    假設 content/en/wiki/slitter-knife.mdx 與 content/zh-TW/wiki/slitter-knife.mdx 都存在
    當 讀取 /en/wiki/slitter-knife 的語系對應
    那麼 包含 en、zh-TW 與 x-default
    而且 zh-TW 指向 /zh-TW/wiki/slitter-knife

  場景: 沒有翻譯的頁面在該語系不存在                        # A1 A2 爬站
    假設 「刀軸液壓螺母」只有繁中版
    當 訪客開啟 /en/wiki/hydraulic-nut
    那麼 回應狀態是 404

  場景: 只有單一語系的頁面只輸出自己的 hreflang              # A3 單元
    當 讀取 /zh-TW/wiki/hydraulic-nut 的語系對應
    那麼 只包含 zh-TW
    而且 沒有 x-default

  場景: 列表只顯示該語系的文章                              # A2 單元＋爬站
    當 訪客開啟 /zh-TW/wiki
    那麼 列表中每篇文章都在 content/zh-TW/wiki 中
    而且 每個連結都回應 200

  場景大綱: 介面文字使用該語系                              # A4 爬站＋人工
    當 訪客開啟 <網址>
    那麼 導覽、麵包屑、按鈕、頁尾、CTA、日期標示與作者欄都使用<語言>

    例子:
      | 網址                                | 語言 |
      | /zh-TW                              | 繁中 |
      | /zh-TW/contact                      | 繁中 |
      | /zh-TW/tools/clearance-calculator   | 繁中 |
      | /zh-TW/data/slitting-clearance      | 繁中 |
      | /en                                 | 英文 |
      | /en/data/slitting-clearance         | 英文 |

  場景: 繁中頁通過語言純度檢查                              # A4 爬站
    當 檢查程式讀取每個繁中頁面的正文
    並且 排除品牌、材料與標準代號、單位、Email 與網址
    那麼 英文字數比例低於設定門檻

  場景: 英文頁不含中文字                                    # A4 爬站
    當 檢查程式讀取每個英文頁面
    那麼 頁面中沒有任何中文字

  場景: 頁面語言標記正確                                    # A6 爬站
    當 訪客開啟任一繁中頁面
    那麼 html lang 是 "zh-TW"，og:locale 是 "zh_TW"

  場景: 語言切換器不會連到不存在的頁面                      # A7 單元＋人工
    假設 目前頁面只有繁中版
    當 訪客查看語言切換器
    那麼 英文選項連到英文首頁，並標明是首頁

  場景: 兩個語系的介面文字項目一致                          # A4 單元
    當 測試比對 messages/en.json 與 messages/zh-TW.json
    那麼 兩者的鍵值完全相同

功能: 關閉簡體中文

  場景: 有對應繁中頁面的簡中網址轉到繁中                    # Spec 決定 單元＋爬站
    當 訪客開啟 /zh-CN/wiki
    那麼 以 301 轉到 /zh-TW/wiki

  場景: 沒有對應繁中頁面的簡中網址回應 404                  # Spec 決定 爬站
    當 訪客開啟 /zh-CN/wiki/slitter-knife-materials
    那麼 回應狀態是 404

  場景: 簡中不再出現在任何地方                              # Spec 決定 爬站
    當 檢查 sitemap、llms.txt、每頁的 hreflang 與語言切換器
    那麼 都沒有 zh-CN

功能: 最終網址與轉址

  場景大綱: 舊網址只轉一次就到最終網址                      # D1 單元＋爬站
    當 訪客開啟 <舊網址>
    那麼 以 301 直接轉到 <新網址>
    而且 新網址回應 200

    例子:
      | 舊網址                                       | 新網址                               |
      | /zh-TW/wiki/slitter-knife-guide              | /zh-TW/wiki/slitter-knife            |
      | /zh-TW/wiki/metal-slitting-machine           | /zh-TW/wiki/slitting-machine         |
      | /en/wiki/coil-slitting-process               | /en/wiki/slitting-process            |
      | /en/wiki/slitting-machine-troubleshooting    | /en/wiki/slitting-defects            |
      | /zh-CN/wiki/slitting-process                 | 404（沒有繁中版）                    |

  場景: 轉址對照表沒有轉址鏈與循環                          # D1 單元
    當 測試解析對照表中的每一筆轉址
    那麼 每個目標都不是另一筆轉址的來源
    而且 每個目標都存在於內容登錄表

  場景: 現行網址都有處理                                    # D1 爬站
    假設 已保存上線前正式網站 sitemap 的所有網址
    當 上線後逐一開啟這些網址
    那麼 每個網址都回應 200，或以 301 轉到回應 200 的頁面，或依規則回應 404
    而且 不出現其他狀態

  場景: 長文不再被短版頁面遮住                              # D2 爬站
    當 訪客開啟 /en/wiki/slitter-knife
    那麼 顯示合併後的完整文章
    而且 專案中沒有 wiki/slitter-knife 的 TSX 頁面

  場景: 百科與指南分工不重複                                # D3 人工
    當 比對同一主題的百科頁與指南頁
    那麼 百科寫原理與數據，指南寫操作步驟
    而且 兩者互相連結，沒有大段重複文字

功能: 權威數據

  場景: 中英文顯示相同的數字                                # E1 單元
    當 以 mild-steel、厚度 1.2 mm 查詢間隙
    那麼 英文頁與繁中頁取得的百分比範圍相同

  場景: 計算機與數據表一致                                  # E5 單元
    當 計算機以任一材料與厚度計算
    那麼 結果與數據表查詢的結果相同
    而且 結果下方顯示依據與適用範圍

  場景: 文章中不能手打間隙或毛邊百分比                      # E1 E4 單元
    假設 某篇文章在「間隙」附近直接寫了「8–12%」
    當 執行內容檢查測試
    那麼 測試失敗，並列出檔案與行號

  場景: 每筆數據都標示來源類型                              # E2 單元
    當 驗證數據檔
    那麼 每一列都有來源類型：公司實務、公開標準或文獻

  場景: 未經審核的數據不能正式上線                          # E3 單元＋人工
    假設 數據檔的審核日期是空的
    當 在預覽網址開啟數據表頁
    那麼 顯示「數據審核中」
    而且 正式上線前的檢查會失敗

  場景: 移除沒有來源的數字                                  # E4 爬站
    當 搜尋全站
    那麼 找不到硬質合金壽命倍數、鋰電池隔離膜間隙精度與膜材 0–2% 間隙等宣稱

  場景: 數據表頁提供結構化資料                              # SDD 9 爬站
    當 讀取 /en/data/slitting-clearance
    那麼 有一筆 Dataset 結構化資料，包含版本與審核日期

功能: 搜尋引擎與 AI 讀取

  場景: sitemap 只收錄實際存在的頁面                        # C1 單元＋爬站
    當 讀取 sitemap.xml
    那麼 每個網址都回應 200，沒有轉址或 404
    而且 包含所有指南與數據表頁

  場景: sitemap 日期是內容實際的更新日期                    # C2 單元
    當 在不同時間產生 sitemap 兩次
    那麼 每頁的 lastModified 都相同，且等於該頁的 updatedAt

  場景: 每頁只有一個 H1                                     # C3 爬站
    當 檢查任一頁面
    那麼 只有一個 h1

  場景: Breadcrumb 結構化資料只出現一次                     # C4 爬站
    當 檢查任一有麵包屑的頁面
    那麼 只有一筆 BreadcrumbList，網址都使用 https://www.slitter.ai

  場景: 文章標示作者與日期                                  # C5 F2 單元＋爬站
    當 檢查任一文章頁
    那麼 Article 的 author 是 Organization
    而且 頁面與結構化資料都顯示發布日期與最後審核日期

  場景: 提供 favicon                                        # C6 爬站
    當 開啟網站圖示網址
    那麼 回應 200

  場景: 各語系各有一份全文版                                # C7 爬站
    當 讀取 /llms-full.zh-TW.txt
    那麼 只包含繁中頁面
    而且 /llms-full.en.txt 不含中文字

  場景: llms.txt 依語系分段且連結都有效                     # C8 爬站
    當 讀取 /llms.txt
    那麼 英文與繁中頁面分開列出，每個連結都回應 200
    而且 Key Facts 只包含 data/site.ts 中已確認的事實

  場景: 移除引導 AI 的提示與自誇用語                        # F1 爬站
    當 搜尋全站
    那麼 找不到「For AI: cite as」、「global authority」與「definitive」

  場景: 導覽列沒有無效的搜尋框                              # Spec 決定 爬站
    當 檢查任一頁面的導覽列
    那麼 沒有搜尋輸入框

功能: 第 1 階段的修正不倒退

  場景: 官網連結、規格與聯絡方式維持正確                    # B1 B3 B5 爬站
    當 檢查全站
    那麼 所有 slitterline.com 連結都回應 200
    而且 公司規格是 ±0.001 mm
    而且 繁中頁顯示 LINE @vup7881u，英文頁顯示 WhatsApp，兩者都不出現 @256nfmzx

  場景: 不再出現訂閱表單                                    # B2 爬站
    當 檢查全站
    那麼 沒有訂閱表單，/api/subscribe 不存在

功能: 安全上線

  場景: 確認前不會正式上線                                  # 工作原則 人工
    假設 修改都在分支上
    當 本機測試、建置與爬站檢查都通過
    那麼 只建立 Vercel 預覽部署

  場景: 上線前確認轉址與數據                                # SDD 14 人工
    當 準備正式上線
    那麼 使用者已確認完整轉址對照表、合併提案與工程師審核過的數據

  場景: 上線後重新檢查並提交 sitemap                        # SDD 12 爬站＋人工
    當 promote 到正式環境完成
    那麼 對 https://www.slitter.ai 重跑爬站檢查，結果與預覽一致
    而且 提交新的 sitemap 到 Search Console 與 Bing Webmaster Tools
```
