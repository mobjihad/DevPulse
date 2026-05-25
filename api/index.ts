import app from "../src/app.js";
  import initDb from "../src/db/index.js";

  initDb().catch((err) => console.error("DB init failed:", err));
  
  export default app;
