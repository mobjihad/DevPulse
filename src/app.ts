import express, { type Application } from "express"
import authRoutes from "./modules/auth/auth.route"
import issueRoutes from "./modules/issues/issues.route"
import { globalErrorHandler } from "./middleware/globalErrorHandler"
import cors from "cors";

const app : Application = express()
 app.use(cors()); 
 
app.use(express.json())

app.use("/api/auth",authRoutes)
app.use("/api/issues", issueRoutes)

app.use(globalErrorHandler)
export default app