import type { Request, Response } from "express";
import issuesService from "./issues.service.js";
import { verifyJWT } from "../../utils/jwt.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { issuestatus, itype } from "../../types/index.js";
import authService from "../auth/auth.service.js";

export const createIssues = async(req: Request, res: Response) => {
    const reporter_id = req.user!.userId; 
    const { title, description, type } = req.body;

    if (title.length > 150) {
        sendResponse(res, false, {
            message: "Validation Failed",
            errors: "Title length can't exceed 150 characters"
        }, 400); 
        return;
    }
    
    if (description.length < 20) {
        sendResponse(res, false, {
            message: "Validation Failed",
            errors: "Description must contain minimum 20 characters"
        }, 400); 
        return;
    }
    
    if (!itype.includes(type)) {
        sendResponse(res, false, {
            message: "Validation Failed",
            errors: "Issue types must be either 'bug' or 'feature_request'"
        }, 400); 
        return;
    }

    const newIssue = await issuesService.createIssues({ title, description, type, reporter_id });

    sendResponse(res, true, {
        message: "Issue created successfully",
        data: newIssue
    }, 201);
}

export const getIssuebyID = async(req: Request, res: Response) => {
    const paramid = Number(req.params.id);
    const issues = await issuesService.getIssuebyID(paramid);
    
    if (!issues) {
        sendResponse(res, false, {
            message: "Resource Not Found",
            errors: "No issue found with the provided ID"
        }, 404);
        return; 
    }
    
    const { id, title, description, type, status, created_at, updated_at } = issues;
    const reporterID = issues.reporter_id;
    const reporterDetails = await authService.findUserById(reporterID);
    
    const { id: reporter_id, name, role } = reporterDetails;

    const reporter = {
        id:reporter_id,
        name, 
        role
    };

    sendResponse(res, true, {
        data: {
            id,
            title,
            description,
            type,
            status,
            reporter,
            created_at,
            updated_at
        }
    }, 200);
}

export const getAllIssues = async(req: Request, res: Response) => {
    const sortMethod = req.query.sort as string || 'newest';
    const issueType = req.query.type as string;
    const status = req.query.status as string;

    let sortCriteria = {};
    
    if (sortMethod === 'newest') {
        sortCriteria = { created_at: -1 };
    } else if (sortMethod === 'oldest') {
        sortCriteria = { created_at: 1 };
    }
   
    const issues = await issuesService.getAllIssues(sortMethod, issueType, status);
    
    if (!issues) {
        sendResponse(res, false, {
            message: "Resource Not Found",
            errors: "No issues found matching the given criteria"
        }, 404);
        return;
    }

    sendResponse(res, true, {
        data: issues
    }, 200);
}

export const updateIssue = async(req: Request, res: Response) => {
    const issueId = Number(req.params.id);
    const { title, description, type } = req.body;

    const updatedIssues = await issuesService.updateIssue({ title, description, type }, issueId);
  
    if (!updatedIssues) {
        sendResponse(res, false, {
            message: "Update Failed",
            errors: "Unable to update the issue. It may not exist."
        }, 400);
        return;
    }

    sendResponse(res, true, {
        message: "Issue updated successfully",
        data: updatedIssues
    }, 200);
}

export const deleteIssue = async(req: Request, res: Response) => {
    console.log("Inside Delete issue dbms")
    const issueId = Number(req.params.id);
    const deletedRowCount = await issuesService.deleteIssues(issueId);

    if (deletedRowCount === 0) {
        return sendResponse(res, false, {
            message: "Deletion Failed",
            errors: "Issue not found or already deleted"
        }, 404);
    }
    console.log("Inside Delete issue dbms 2")
    return sendResponse(res, true, {
        message: "Issue deleted successfully"
    }, 200);
}