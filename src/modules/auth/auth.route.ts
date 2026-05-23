import { Router } from "express";
import { signup } from "./auth.controller";

const router = Router(); 


router.post("/api/auth/signup" , signup)











export default router