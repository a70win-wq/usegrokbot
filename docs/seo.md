# Google 與 Bing 搜尋設定

## 本次改善

- 首頁與範本頁的搜尋標題清楚說明教學、範本及真實案例，涵蓋四種既有語言。
- 社群頁補上正式網址、語言對應和獨立的分享資料。
- 首頁的網站名稱資料使用主網域，案例頁補上語言與網址。
- 移除不能代表實際頁面更新時間的日期。來源貼文的日期不等於網站頁面的修改日期；18 篇保留案例原有的修改日期甚至早於發布日期。
- 保留 620 個可收錄網址、既有語言對應、舊案例轉址及刻意不收錄的頁面。
- Bing IndexNow 通知改用正式網站地圖，取代固定的舊清單；送出前檢查網站驗證檔，排除外站及帶篩選參數的網址。

## 已完成檢查（2026-09-17）

- 完整建置成功；直接檢查產生的 620 個頁面，正式網址、語言對應、摘要、分享資料和結構化資料均通過。
- ego-browser 實際操作首頁 → 範本 → 工程師範本、手機選單 → 社群、英語切換及案例頁。
- 電腦 1440px、手機 390px 無水平溢出；抽查主要文字為 16px，標題為 30px 以上。
- IndexNow 13 項測試通過；正式站預覽讀到 620 個網址，無排除項目，沒有送出通知。
- 網址、來源內容、搜尋、提示詞、文章清單及日語介面檢查通過。
- Google Search Console 的網址資源 `https://usegrokbot.com/` 可存取。網站地圖於 2026-09-16 成功讀取 620 個網址；2026-09-14 報告列出 2,130 個已收錄新舊網址。這是修改前的基準，不能視為本次優化效果。
- Bing Webmaster Tools 尚未登入，因此未核對其收錄或成效報告。

以上為發布前檢查紀錄。使用者已於 2026-09-17 批准發布；正式網站驗證與 IndexNow 回應以本次發布結果為準。

另有兩項原有內容檢查未通過：自動匯入的範本 `WAQAF0bSQTRrrTb1q-J9Y` 缺少人工確認的身份分類和日語內容。這次未修改其分類或翻譯，也未放寬這兩項檢查。因此本次搜尋資料檢查通過，不代表整個專案的所有檢查均通過。

## 檢查與發布後操作

1. `npm run build -- --webpack`
2. `npm run validate:seo`：直接檢查建置好的搜尋資料。
3. `node --test scripts/lib/indexnow.test.mjs`
4. 正式發布後，先檢查正式網域的頁面和網站地圖，再執行 `npm run indexnow:preview`。
5. 確認正式版本正確後，執行 `npm run indexnow:submit`。也可手動執行 GitHub 的 IndexNow 工作流程；預設只預覽。
6. Google 已有網站地圖紀錄，發布後可在 Search Console 檢查重點頁面。Bing 後台需登入再確認網站資源及提交網站地圖。

IndexNow 工作流程只可手動觸發，不會在預覽部署或每次內容同步後重複通知。HTTP 200 代表已收到通知，202 代表收到但仍在驗證網站，不代表已收錄或排名提升。

建置時 Next.js 仍有 metadataBase 提示；620 個可收錄頁面的實際圖片網址已確認使用正式網域。若本機重複建置遇到 WasmHash 暫存錯誤，可移除 `.next/cache/webpack` 後重試。

## 依據

- [Google：網站地圖與準確的更新時間](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google：網站名稱](https://developers.google.com/search/docs/appearance/site-names)
- [Google：多語言頁面](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [IndexNow：通知與回應狀態](https://www.indexnow.org/documentation)
