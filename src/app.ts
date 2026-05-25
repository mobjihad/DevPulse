import express, { type Application } from "express"
import authRoutes from "./modules/auth/auth.route.js"
import issueRoutes from "./modules/issues/issues.route.js"
import { globalErrorHandler } from "./middleware/globalErrorHandler.js"
import cors from "cors";

const app : Application = express()
 app.use(cors()); 

app.use(express.json())

app.get("/", (_req, res) => {
    res.json({
      success: true,
      message: "DevPulse API",
      endpoints: ["/api/auth/signup", "/api/auth/login", "/api/issues"],
    });
  });

app.use("/api/auth",authRoutes)
app.use("/api/issues", issueRoutes)

app.use(globalErrorHandler)
export default app