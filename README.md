# 🏆 線上分數兌換表管理系統

一個功能完整的線上分數兌換表管理系統，適合學校、機構、公司等使用。支援自訂分數區間、物品管理、圖片上傳、列印功能，並可完全在GitHub Pages上運行。

## ✨ 主要功能

### 🎯 分數區間管理
- ✅ 新增/編輯/刪除分數區間
- ✅ 自定義區間名稱、分數範圍、顏色主題
- ✅ 防重疊檢查，確保分數區間不衝突
- ✅ 自動排序顯示

### 📦 物品管理
- ✅ 新增/編輯/刪除兌換物品
- ✅ 支援物品名稱、分數、描述設定
- ✅ 圖片上傳功能（支援拖拽上傳）
- ✅ 自動分配到對應分數區間
- ✅ 響應式卡片設計

### 🖨️ 列印功能
- ✅ 一鍵列印整個兌換表
- ✅ 專業列印版面設計
- ✅ 支援自訂系統標題、機構名稱
- ✅ 自動生成列印日期
- ✅ 優化A4紙張格式

### 💾 數據管理
- ✅ 自動本地儲存（LocalStorage）
- ✅ JSON格式匯出/匯入功能
- ✅ 跨裝置數據同步
- ✅ 備份與還原功能

### 🎨 使用者體驗
- ✅ 響應式設計，支援手機、平板、桌面
- ✅ 現代化UI設計
- ✅ 即時提示與錯誤處理
- ✅ 鍵盤快捷鍵支援
- ✅ 無障礙設計

## 🚀 快速開始

### 方法一：直接使用
[點擊這裡訪問線上版本](https://your-username.github.io/score-exchange-table)

### 方法二：部署到自己的GitHub Pages

1. **Fork 這個專案**
   ```bash
   # 點擊GitHub頁面右上角的 "Fork" 按鈕
   ```

2. **設定GitHub Pages**
   - 進入您fork的專案設定 (Settings)
   - 找到 "Pages" 選項
   - 在 "Source" 中選擇 "Deploy from a branch"
   - 選擇 "main" 分支，資料夾選擇 "/ (root)"
   - 點擊 "Save"

3. **訪問您的網站**
   - 網址格式：`https://您的用戶名.github.io/專案名稱`
   - 通常需要等待1-2分鐘部署完成

### 方法三：本地開發

1. **下載專案**
   ```bash
   git clone https://github.com/your-username/score-exchange-table.git
   cd score-exchange-table
   ```

2. **本地運行**
   ```bash
   # 使用任何HTTP服務器，例如：
   python -m http.server 8000
   # 或
   npx serve .
   ```

3. **在瀏覽器開啟**
   ```
   http://localhost:8000
   ```

## 📖 使用說明

### 初次使用

1. **系統設定**
   - 修改「系統標題」（例如：XX學校積分兌換表）
   - 填入「機構名稱」（選填，會顯示在列印頁面）

2. **建立分數區間**
   - 點擊「📝 新增分數區間」
   - 設定區間名稱（例如：低分區）
   - 設定分數範圍（例如：5-10分）
   - 選擇區間顏色主題

3. **新增物品**
   - 點擊「➕ 新增物品」
   - 填入物品名稱、所需分數
   - 可選填物品描述
   - 上傳物品圖片（支援拖拽上傳）

### 日常管理

- **編輯物品**：點擊物品卡片上的「編輯」按鈕
- **刪除物品**：點擊物品卡片上的「刪除」按鈕
- **管理區間**：每個區間右上角有編輯、刪除按鈕
- **列印表格**：點擊「🖨️ 列印兌換表」

### 數據備份

- **匯出數據**：點擊「💾 匯出資料」下載JSON備份檔
- **匯入數據**：點擊「📥 匯入資料」選擇JSON備份檔還原

## 🔧 技術規格

### 前端技術
- **HTML5**：語義化標籤、無障礙設計
- **CSS3**：響應式設計、現代化UI
- **Vanilla JavaScript**：純JavaScript，無依賴框架
- **LocalStorage**：本地數據持久化

### 瀏覽器支援
- ✅ Chrome/Chromium 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ 現代行動瀏覽器

### 檔案結構
```
score-exchange-table/
├── index.html          # 主頁面
├── style.css           # 樣式表
├── app.js              # 主要功能邏輯
├── README.md           # 說明文件
└── .github/
    └── workflows/
        └── pages.yml    # GitHub Actions (可選)
```

## 🎨 自訂化

### 修改顏色主題
編輯 `style.css` 檔案中的CSS變數：
```css
:root {
  --primary-color: #3b82f6;    /* 主色調 */
  --success-color: #10b981;    /* 成功色 */
  --danger-color: #ef4444;     /* 危險色 */
  /* ...更多顏色設定 */
}
```

### 增加分數區間顏色
在 `app.js` 中的 `rangeColor` 選項增加新顏色：
```javascript
<option value="purple">紫色</option>
<option value="pink">粉色</option>
```

### 修改預設資料
編輯 `app.js` 中的 `initDefaultData()` 函數來設定預設的分數區間和物品。

## 📱 響應式設計

系統完全支援各種螢幕尺寸：

- **桌面版** (>768px)：完整功能，多欄位顯示
- **平板版** (768px-480px)：適中版面，觸控友好
- **手機版** (<480px)：單欄顯示，大按鈕設計

## 🖨️ 列印最佳化

- **A4格式**：專為A4紙張最佳化
- **黑白友好**：確保黑白列印效果良好
- **分頁控制**：避免內容跨頁截斷
- **專業版面**：包含標題、日期、機構資訊

## 🔒 隱私與安全

- **純前端應用**：所有數據存在用戶端
- **無需註冊**：直接使用，無需帳號
- **離線支援**：缺網時仍可正常使用
- **數據自主**：完全掌控自己的數據

## 🐛 故障排除

### 常見問題

**Q: 數據不見了怎麼辦？**
A: 數據存在瀏覽器LocalStorage中，清除瀏覽器資料會導致數據遺失。建議定期使用「匯出資料」功能備份。

**Q: 圖片上傳失敗？**
A: 確保圖片檔案小於5MB，支援格式：JPG、PNG、GIF、WebP。

**Q: 列印版面不正確？**
A: 建議使用Chrome瀏覽器列印，列印設定選擇「更多設定」→「包含背景圖形」。

**Q: 手機上操作不便？**
A: 系統已優化行動裝置體驗，建議使用Chrome或Safari最新版本。

### 重置系統
如需完全重置，請開啟瀏覽器開發者工具 (F12)，在Console中執行：
```javascript
localStorage.removeItem('scoreExchangeData');
location.reload();
```

## 🤝 貢獻指南

歡迎提交 Issue 和 Pull Request！

### 開發流程
1. Fork 專案
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 發起 Pull Request

### 程式碼規範
- 使用2空格縮排
- 變數命名使用駝峰式 (camelCase)
- 函數名稱要有意義
- 重要功能請加上註解

## 📄 授權條款

本專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 檔案

## 🙋‍♂️ 支援與回饋

- **GitHub Issues**: [提交問題](https://github.com/your-username/score-exchange-table/issues)
- **功能建議**: 歡迎在 Issues 中提出新功能建議
- **使用問題**: 請先查看本README的故障排除章節

## 🎉 更新日誌

### v1.0.0 (2025-08-25)
- ✨ 初始版本發布
- ✅ 完整的分數區間管理功能
- ✅ 物品管理與圖片上傳
- ✅ 專業列印功能
- ✅ 數據匯出匯入
- ✅ 響應式設計
- ✅ GitHub Pages 支援

---

## 💝 致謝

感謝所有使用和貢獻這個專案的朋友們！

如果這個專案對您有幫助，歡迎給個 ⭐ Star！

---

**製作者**: [Your Name](https://github.com/your-username)  
**專案連結**: [https://github.com/your-username/score-exchange-table](https://github.com/your-username/score-exchange-table)  
**線上演示**: [https://your-username.github.io/score-exchange-table](https://your-username.github.io/score-exchange-table)