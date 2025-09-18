// src/server.js
import http from "http";
import app from "./app.js";
import { env } from "./config/env.js";
import { connectMongo, onMongoSignals } from "./loaders/mongoose.js";

async function start() {
  await connectMongo();
  onMongoSignals();

  const server = http.createServer(app);
  server.listen(env.PORT, () => {
    console.log(`[erp-api] listening on http://localhost:${env.PORT}`);
  });
}

start().catch(err => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
