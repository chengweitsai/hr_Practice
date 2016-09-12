## hr_Practice
後端server使用 Express 框架，建立於Node.js之上，前端會使用 React。
To start the server: ` npm start `

# 資料格式 與 資料庫
以下的格式代表一個user的資料，id 與 name 的value皆不得為null：
```
{
  id: Int,
  name: String,
}
```
以變數` database `代表臨時的資料庫，在 `app.js`中寫初始狀況有兩位user資料：
```
var database = {
  users: [
    {
      id: 0,
      name:'Mark',
    },
    {
      id: 1,
        name:'Dennis',
      }
  ],
};
```

#API
透過`body-parser` 來處理接受到的 `x-www-form-urlencoded` 和 `json` request，以`json` response，同時回應適當的http status。
