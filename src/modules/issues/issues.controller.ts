import type { Request, Response } from "express";
import issuesService from "./issues.service";
import { verifyJWT } from "../../utils/jwt";
import { sendResponse } from "../../utils";
import { issuestatus, itype } from "../../types";


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