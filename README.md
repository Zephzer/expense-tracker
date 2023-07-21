#  支出紀錄
## 專案簡介
能夠快速記帳，依照分類回顧每種支出的金額。

## 安裝流程
## 本地電腦執行
1.打開終端機，cd 移動到預定放置本專案的資料夾，執行以下指令以複製本專案：
- git clone https://github.com/Zephzer/expense-tracker.git

2.在該專案資料夾中，以終端機方式執行安裝 npm：
- npm install

3.安裝完成後，請建立「.env」檔案，依照以下格式設定連到您自己 MongoDB 的連結：
- FACEBOOK_ID=SKIP
- FACEBOOK_SECRET=SKIP
- FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
- SESSION_SECRET={{yoursecret}}
- MONGOOSE_URI=mongodb+srv://{{account}}:{{password}}.qu1sf7p.mongodb.net/
- PORT=3000

4.執行以下指令，匯入本專案的種子資料到 MongoDB 資料庫：
- npm run seed

5.看到以下訊息代表資料已經匯入 MongoDB：
- done

6.最後執行以下指令啟動網站：
- npm run dev

7.看到以下指令代表網站載入完成，可以使用瀏覽器打開 http://localhost:3000 即可進入網站。
- This express is running on http://localhost:3000
