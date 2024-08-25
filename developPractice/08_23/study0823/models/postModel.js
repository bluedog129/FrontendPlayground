const { MongoClient, ObjectId } = require("mongodb");

const uri = `mongodb+srv://bluedog129:${process.env.MONGO_PASS}@cluster0.udst0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri);

let db;

async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db("todo");
  }
  return db;
}

exports.getAllPosts = async () => {
  const db = await connectDB();
  return db.collection("posts").find().sort({ _id: -1 }).toArray();
};

exports.createPost = async (post) => {
  const db = await connectDB();
  return db.collection("posts").insertOne(post);
};

// 기타 데이터베이스 작업 함수들...
