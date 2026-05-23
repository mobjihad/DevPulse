import express from "express"
import authRoutes from "./modules/auth/auth.route"

const app = express()


app.use(authRoutes)


export default app