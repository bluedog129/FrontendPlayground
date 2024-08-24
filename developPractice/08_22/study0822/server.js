require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();
const { MongoClient } = require("mongodb");

const MONGO_PASS = process.env.MONGO_PASS;
const uri = `mongodb+srv://bluedog129:${MONGO_PASS}@cluster0.udst0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri);

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// const connectDB = async () => {
// 	try {
// 		await client.connect();
// 		const db = client.db("todo");
// 		await db.collection("posts").insertOne({ name: "test1", age: 25 });
// 		console.log("데이터 추가 성공...");
// 		console.log("데이터 추가 성공...");
// 	} catch (err) {
// 		console.error(err);
// 	}
// };
// connectDB();

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/list", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("todo");
    const posts = await db.collection("posts").find().toArray();
    console.log("데이터 가져오기 성공...", posts);

    res.render("list", { posts });
  } catch (err) {
    console.error(err);
  }
});

app.post("/add", async (req, res) => {
  const { title, dateOfGoals, dateOfCreate, todoDetail } = req.body;
  console.log("body---", title);

  try {
    await client.connect();
    const db = client.db("todo");
    await db
      .collection("posts")
      .insertOne({ title, dateOfGoals, dateOfCreate, todoDetail });
    console.log("데이터 추가 성공...");
  } catch (err) {
    console.error(err);
  }

  res.redirect("list");
});

app.listen(3000, () => {
  console.log("서버 실행중...");
});
