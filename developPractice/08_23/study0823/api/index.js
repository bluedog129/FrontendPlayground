require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const postRoutes = require("./routes/postRoutes"); // 경로 수정

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 라우터 설정
app.use("/", postRoutes);

// Vercel에서 요구하는 서버리스 함수 형태
module.exports = (req, res) => {
  app(req, res);
};
