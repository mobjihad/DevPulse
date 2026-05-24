import type { NextFunction, Request, Response } from "express";
import type { Role } from "../types";
import { sendResponse } from "../utils/sendResponse";
import { verifyJWT } from "../utils/jwt";
import {  checkValidUserRole, verifyAccess } from "../modules/auth/auth.controller";
import authVerify from "../utils/authUtis"

export const authorisedUser = (authorised : Role[]) =>{

    return async (req: Request , res: Response , next : NextFunction) =>{

       await authVerify.checkToken(req,res)

      await  authVerify.checkValidRole(req,res)
        
        next()

}





}