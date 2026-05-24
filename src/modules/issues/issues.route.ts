import { Router } from "express";
import { authorisedUser } from "../../middleware/auth";
import { createIssues, getAllIssues, getIssuebyID} from "./issues.controller";


const router = Router();

router.post("/", authorisedUser(["maintainer","contributor"]), createIssues)
router.get("/:id", getIssuebyID)
router.get("/", getAllIssues)


export default router 