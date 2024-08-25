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
// 다른 라우트 정의 후에 추가
app.use((req, res, next) => {
  console.log(`404 Not Found: ${req.method} ${req.url}`);
  res.status(404).send("Sorry, page not found!");
});

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
