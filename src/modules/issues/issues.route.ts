import { Router } from "express";
import { authorisedUser } from "../../middleware/auth";
import { createIssues, getAllIssues, getIssuebyID, updateIssue} from "./issues.controller";
import { validatedToUpdate } from "../../middleware/updateIssue";


const router = Router();

router.post("/", authorisedUser(["maintainer","contributor"]), createIssues)
router.get("/:id", getIssuebyID)
router.get("/", getAllIssues)
router.patch("/:id",authorisedUser(["maintainer","contributor"]), validatedToUpdate(), updateIssue)


export default router 