const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/", postController.getIndex);
router.get("/list", postController.getList);
router.post("/add", postController.addPost);

// 기타 라우팅 설정들...

module.exports = router;
