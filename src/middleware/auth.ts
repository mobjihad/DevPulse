import type { NextFunction, Request, Response } from "express";
import type { Role } from "../types";
import { sendResponse } from "../utils";
import { verifyJWT } from "../utils/jwt";
import {  checkValidUserRole, verifyAccess } from "../modules/auth/auth.controller";

export const authorisedUser = (authorised : Role[]) =>{

    return async (req: Request , res: Response , next : NextFunction) =>{

        const token = req.headers.authorization 

        if(!token){
            sendResponse(res, false, {
                message:"Unauthorized"
            },401)
            
            return
        }

        const roleValid = await checkValidUserRole(token, req)
        
       
        if(!roleValid){

            sendResponse(res, false, {
                message: "Forbidden"
            },403)
            
            return
        }
        
        next()

}




}