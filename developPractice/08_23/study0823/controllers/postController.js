const { ObjectId } = require("mongodb");
const Post = require("../models/postModel");

exports.getIndex = (req, res) => {
  res.render("index");
};

exports.getList = async (req, res) => {
  try {
    const posts = await Post.getAllPosts();
    res.render("list", { posts });
  } catch (err) {
    console.error(err);
    res.status(500).send("서버 오류가 발생했습니다.");
  }
};

exports.addPost = async (req, res) => {
  const { title, dateOfGoals, dateOfCreate, todoDetail } = req.body;

  try {
    await Post.createPost({ title, dateOfGoals, dateOfCreate, todoDetail });
    res.redirect("/list");
  } catch (err) {
    console.error(err);
    res.status(500).send("서버 오류가 발생했습니다.");
  }
};

// 기타 컨트롤러 함수들...
