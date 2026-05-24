import type { Request, Response } from "express";
import { sendResponse } from ".";
import { checkValidUserRole } from "../modules/auth/auth.controller";
import issuesService from "../modules/issues/issues.service";
import { verifyJWT } from "./jwt";
import authService from "../modules/auth/auth.service";

class authVerify {


    async checkToken(req: Request, res: Response){


                const token = req.headers.authorization 
        
                if(!token){
                    sendResponse(res, false, {
                        message:"Unauthorized"
                    },401)
                    
                    return
                }

    }

    async checkValidRole(req:Request,res: Response){

        const roleValid = await checkValidUserRole(req)
        
       
        if(!roleValid){

            sendResponse(res, false, {
                message: "Forbidden"
            },403)
            
            return
        }
    }

    async checkAllowedToedit(req:Request,res: Response){

        const issueId= Number(req.params.id) 

       const issueExist =await issuesService.getIssuebyID(issueId)
       
       if(!issueExist){

            sendResponse(res, false, {
                message:"Issue not exist"
            },404)
            return

       }
       const issueStatus = issueExist.status 
       const issuReporterId = issueExist.reporter_id

       const allowedToEdit =await this.checkOwnedTheIssue(req,issuReporterId,issueStatus)

       if(!allowedToEdit){

           sendResponse(res, false, {
                message:"Forbidded, not allowed to edit"
            },403)
            return 

       }




    }

    async checkOwnedTheIssue(req:Request, issueReporterId: number, issueStatus: string){

        const token = req.headers.authorization as string
        const decodedToken = await verifyJWT(token)

        const loggedinuserId = (decodedToken as { id: number }).id 

        
        const loggedInuserData =await authService.findUserById(loggedinuserId)
        const {role} = loggedInuserData
        const loggedInUserRole = role

        if(loggedInUserRole=="contributor" && loggedinuserId==issueReporterId && issueStatus=="open"){

            return true

        }else if(loggedInUserRole=="maintainer"){

            return true
        }else{

            return false
        }


    }
   




}


export default new authVerify()