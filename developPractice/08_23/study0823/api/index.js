require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();
const postRoutes = require("../routes/postRoutes");

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

module.exports = app;

// 라우터 설정
app.use("/", postRoutes);
