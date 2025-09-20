// src/app.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { env } from "./config/env.js";
import expensesRouter from "./routes/expenses.js";
import { devLogin } from "./middlewares/auth.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (env.CORS_ORIGINS.includes(origin)) return cb(null, true);
      return cb(new Error(`CORS blocked for ${origin}`));
    },
    credentials: true,
  })
);


// health
app.get("/api/health", (_req, res) =>
  res.json({ ok: true, service: "erp-api", env: env.NODE_ENV })
);

// dev login (not in production)
app.post("/api/dev-login", devLogin);

// mount features
app.use("/api/expenses", expensesRouter);

// app.use("/api/v1/expenses", expensesRouter);

export default app;
