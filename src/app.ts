import express, { type Application } from "express"
import authRoutes from "./modules/auth/auth.route"
import issueRoutes from "./modules/issues/issues.route"

const app : Application = express()
app.use(express.json())

app.use("/api/auth",authRoutes)
app.use("/api/issues", issueRoutes)

export default app