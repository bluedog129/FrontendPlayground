import { MongoClinet } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const MONGO_PASS = process.env.MONGO_PASS;
const uri = `mongodb+srv://bluedog129:${MONGO_PASS}@cluster0.udst0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
     db = client.db("todo");
  } catch {}
}
