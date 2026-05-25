import app from "../src/app";
  import initDb from "../src/db";

  initDb().catch((err) => console.error("DB init failed:", err));
  
  export default app;
