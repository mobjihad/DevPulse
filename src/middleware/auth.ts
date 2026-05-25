import type { NextFunction, Request, Response } from "express";
import type { Role } from "../types/index.js";
import { sendResponse } from "../utils/sendResponse.js";
import { verifyJWT } from "../utils/jwt.js";
import {  checkValidUserRole, verifyAccess } from "../modules/auth/auth.controller.js";
import authVerify from "../utils/authUtis.js"

export const authorisedUser = (authorised : Role[]) =>{

    return async (req: Request , res: Response , next : NextFunction) =>{

       await authVerify.checkToken(req,res)

      await  authVerify.checkValidRole(req,res)
        
        next()

}





}