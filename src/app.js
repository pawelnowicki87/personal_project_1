import express from "express";
import authRoutes from "./routes/auth.js";
import homepageRoutes from "./routes/homepage.js";
import "dotenv/config";
import { initDb } from "../db/init.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(authRoutes);
app.use(homepageRoutes);

// run if there is db
const startServer = async () => {
  try {
    await initDb();
    console.log("✅ Database initialized");

    app.listen(port, () => {
      console.log(`🚀 The app is listening on port: ${port}`);
    });
  } catch (err) {
    console.error("❌ Failed to initialize database:", err);
    process.exit(1);
  }
};

startServer();
