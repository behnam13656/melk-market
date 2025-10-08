import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import connectDB from "./connectDB";

let bucket;

export async function getGridFSBucket() {
  if (!mongoose.connection.readyState) {
    await connectDB();
  }

  if (!bucket) {
    const db = mongoose.connection.db;
    bucket = new GridFSBucket(db, { bucketName: "uploads" });
  }

  return bucket;
}
