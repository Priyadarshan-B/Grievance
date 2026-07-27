import app from "./app.js";
import env from "./config/env.js";
import pool from "./config/db.js";

async function startServer() {
  try {
    await pool.query("SELECT NOW()");

    console.log("✅ Database Connected");

    app.listen(env.PORT, () => {
      console.log("-------------------------------------");
      console.log(`🚀 AI Grievance Backend Started`);
      console.log(`🌐 http://localhost:${env.PORT}`);
      console.log("-------------------------------------");
    });
  } catch (err) {
    console.error("❌ Failed to connect to PostgreSQL");
    console.error(err);
    process.exit(1);
  }
}

startServer();