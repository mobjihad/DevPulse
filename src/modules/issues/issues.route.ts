import { Router } from "express";
import { authorisedUser } from "../../middleware/auth";
import { createIssues, getIssuebyID } from "./issues.controller";


const router = Router();

router.post("/", authorisedUser(["maintainer","contributor"]), createIssues)
router.get("/:id", getIssuebyID)



export default router 