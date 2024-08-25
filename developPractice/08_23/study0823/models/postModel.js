const { MongoClient, ObjectId } = require("mongodb");

const uri = `mongodb+srv://bluedog129:${process.env.MONGO_PASS}@cluster0.udst0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri);

let db;

async function connectDB() {
  if (!db) {
    try {
      await client.connect();
      db = client.db("todo");
      console.log("Database connected successfully");
    } catch (err) {
      console.error("Database connection failed:", err);
      throw new Error("Database connection failed");
    }
  }
  return db;
}

exports.getAllPosts = async () => {
  const db = await connectDB();
  try {
    return await db.collection("posts").find().sort({ _id: -1 }).toArray();
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    throw err;
  }
};

exports.createPost = async (post) => {
  const db = await connectDB();
  try {
    return await db.collection("posts").insertOne(post);
  } catch (err) {
    console.error("Failed to create post:", err);
    throw err;
  }
};
