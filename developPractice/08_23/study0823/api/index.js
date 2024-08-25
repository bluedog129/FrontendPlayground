const express = require("express");
const app = express();

// 다른 미들웨어 및 라우트 설정...

// 마지막 미들웨어로 에러 핸들러 추가
app.use((err, req, res, next) => {
  console.error("Error details:", err);
  res.status(500).json({
    message: "Internal server error",
    error: process.env.NODE_ENV === "production" ? {} : err,
  });
});

// Vercel의 서버리스 함수 형태로 내보내기
module.exports = (req, res) => {
  // 전역 에러 핸들링
  try {
    app(req, res);
  } catch (error) {
    console.error("Unhandled error:", error);
    res.status(500).send("Critical server error");
  }
};
