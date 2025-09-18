// src/loaders/mongoose.js
import mongoose from "mongoose";
import { env } from "../config/env.js";

export async function connectMongo() {
  mongoose.set("strictQuery", true);
  await mongoose.connect(env.MONGO_URI);
  console.log("[mongo] connected:", env.MONGO_URI);
}

export function onMongoSignals() {
  const close = async (label) => {
    try {
      await mongoose.connection.close();
      console.log(`\n[mongo] connection closed (${label}).`);
    } finally {
      process.exit(0);
    }
  };
  process.on("SIGINT",  () => close("SIGINT"));
  process.on("SIGTERM", () => close("SIGTERM"));
}
