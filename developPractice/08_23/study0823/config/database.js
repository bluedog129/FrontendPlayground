import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const MONGO_PASS = process.env.MONGO_PASS;
const uri = `mongodb+srv://bluedog129:${MONGO_PASS}@cluster0.udst0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri);

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("todo");
    console.log("Successfully connected to the database");
  } catch (err) {
    console.error("Database connection error:", err);
    throw new Error("Failed to connect to the database");
  }
}

export { connectDB, db };
