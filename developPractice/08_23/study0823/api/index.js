const express = require("express");
const app = express();
const postRoutes = require("./routes/postRoutes");

// 다른 미들웨어 설정...

// 루트 경로 처리
app.get("/", (req, res) => {
  res.render("index"); // 또는 res.send("Hello World!"); 등
});

// 다른 라우트
app.use("/", postRoutes);

// 404 처리
app.use((req, res, next) => {
  res.status(404).send("Sorry, page not found!");
});

module.exports = (req, res) => {
  app(req, res);
};
