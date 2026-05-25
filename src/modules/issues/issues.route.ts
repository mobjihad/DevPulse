import { Router } from "express";
import { authorisedUser } from "../../middleware/auth.js";
import { createIssues, deleteIssue, getAllIssues, getIssuebyID, updateIssue} from "./issues.controller.js";
import { validatedToUpdate } from "../../middleware/updateIssue.js";
import {authorisedMaintainer}  from "../../middleware/maintainerAuth.js";


const router = Router();

router.post("/", authorisedUser(["maintainer","contributor"]), createIssues)
router.get("/:id", getIssuebyID)
router.get("/", getAllIssues)
router.patch("/:id",authorisedUser(["maintainer","contributor"]), validatedToUpdate(), updateIssue)
router.delete("/:id" ,authorisedMaintainer("maintainer"),deleteIssue)


export default router 