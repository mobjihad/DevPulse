import type { Request, Response, NextFunction } from "express";
import { sendResponse } from "./sendResponse";
import { checkValidUserRole } from "../modules/auth/auth.controller";
import issuesService from "../modules/issues/issues.service";
import { verifyJWT } from "./jwt";
import authService from "../modules/auth/auth.service";

class authVerify {

    async checkToken(req: Request, res: Response) {
        const token = req.headers.authorization;
        
        if (!token) {
            sendResponse(res, false, {
                message: "Authentication Failed",
                errors: "Missing authorization token in headers"
            }, 401);
            return;
        }
        
      
    }

    async checkValidRole(req: Request, res: Response) {
        const roleValid = await checkValidUserRole(req);
        
        if (!roleValid) {
            sendResponse(res, false, {
                message: "Authorization Failed",
                errors: "Forbidden: You do not have the required permissions"
            }, 403);
            return;
        }
        
  
    }

    async checkAllowedToedit(req: Request, res: Response) {
        const issueId = Number(req.params.id); 
        const issueExist = await issuesService.getIssuebyID(issueId);
       
        if (!issueExist) {
            sendResponse(res, false, {
                message: "Resource Not Found",
                errors: "The issue you are trying to edit does not exist"
            }, 404);
            return;
        }
        
        const issueStatus = issueExist.status; 
        const issuReporterId = issueExist.reporter_id;
        const allowedToEdit = await this.checkOwnedTheIssue(req, issuReporterId, issueStatus);

        if (!allowedToEdit) {
            sendResponse(res, false, {
                message: "Authorization Failed",
                errors: "Forbidden: You do not have permission to edit this issue"
            }, 403);
            return; 
        }

       
    }

    async checkOwnedTheIssue(req: Request, issueReporterId: number, issueStatus: string) {
        const token = req.headers.authorization as string;
        const decodedToken = await verifyJWT(token);
        const loggedinuserId = (decodedToken as { id: number }).id; 
        
        const loggedInuserData = await authService.findUserById(loggedinuserId);
        const { role } = loggedInuserData;
        const loggedInUserRole = role;

        if (loggedInUserRole === "contributor" && loggedinuserId === issueReporterId && issueStatus === "open") {
            return true;
        } else if (loggedInUserRole === "maintainer") {
            return true;
        } else {
            return false;
        }
    }
}

export default new authVerify();