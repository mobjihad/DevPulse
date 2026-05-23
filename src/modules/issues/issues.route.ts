import { Router } from "express";
import { authorisedUser } from "../../middleware/auth";
import { createIssues } from "./issues.controller";


const router = Router();

router.post("/", authorisedUser(["maintainer","contributor"]), createIssues)





export default router 