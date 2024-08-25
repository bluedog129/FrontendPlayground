require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

// 디버깅을 위한 로그 추가
console.log("Starting application...");

try {
  const postRoutes = require("./routes/postRoutes"); // 경로 확인

  app.use(express.static(path.join(__dirname, "public")));
  app.set("view engine", "ejs");
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // 라우터 설정
  app.use("/", postRoutes);

  console.log("Application setup completed.");
} catch (error) {
  console.error("Error during setup:", error);
}

// Vercel에서 요구하는 서버리스 함수 형태
module.exports = (req, res) => {
  console.log("Received request:", req.method, req.url);
  app(req, res);
};
