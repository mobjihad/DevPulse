import type { Request, Response } from "express";
import issuesService from "./issues.service";
import { verifyJWT } from "../../utils/jwt";
import { sendResponse } from "../../utils";
import { issuestatus, itype } from "../../types";
import authService from "../auth/auth.service";


export const createIssues= async(req: Request , res: Response)=>{

    
        const reporter_id = req.user!.userId 

        const {title,description,type} = req.body

        if(title.length >150){

            sendResponse(res,false, {
                    message: "Ttitle length can't exceed 150 characters"
            },409)
            return
        }
        if(description.length <20){

            sendResponse(res,false, {
                    message: "Description must contain minimum 20 characters"
            },409)
            return
        }
        if(!itype.includes(type)){
              sendResponse(res,false, {
                    message: "Issue types must be either bug or feature_request"
            },409)
            return

        }

       const newIssue =  await issuesService.createIssues({title,description,type,reporter_id})

       sendResponse(res,true,{
        message:"Issue created successfully",
        data:newIssue
       } ,201)



}

export const getIssuebyID =async(req : Request, res: Response) =>{

    const paramid = Number(req.params.id)

    const issues = await issuesService.getIssuebyID( paramid)
    
    if(!issues){

        sendResponse(res, false, {
                message: "Issue Not Found"
        },404)

        return 
    }
    const {id,title,description,type, status, created_at, updated_at } = issues

    const reporterID = issues.reporter_id

    const reporterDetails = await authService.findUserById(reporterID)

    const {id: reporter_id, name, role} = reporterDetails

    const reporter = {
        id, name, role
    }

    sendResponse(res, true, {
        data:{
            id:id,
            title:title,
            description:description,
            type:type,
            status:status,
            reporter: reporter,
            created_at:created_at,
            updated_at:updated_at
        }
    },200)
    



}

export const getAllIssues=async(req: Request , res: Response)=>{

         const sortMethod = req.query.sort as string || 'newest';
         const issueType = req.query.type as string;
         const status = req.query.status as string;

         let sortCriteria = {};
         
             if (sortMethod === 'newest') {
                          sortCriteria = { created_at: -1 };
             } else if (sortMethod=== 'oldest') {
                    sortCriteria = { created_at: 1 };
         }
       
        const issues = await issuesService.getAllIssues(sortMethod,issueType,status)
         if(!issues){

            sendResponse(res,false,{

                message:"Not found"
            },404)
            return
         }


        sendResponse(res,true,{
            data:issues
              
        },200)
        
        
}