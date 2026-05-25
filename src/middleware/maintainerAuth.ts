import type { NextFunction, Request, Response } from "express"
import type { Role } from "../types/index.js"
import authVerify from "../utils/authUtis.js"
import {  checkMaintainer } from "../modules/auth/auth.controller.js"


export const authorisedMaintainer = (authorised: Role)=>{

    
    return async(req: Request, res: Response, next: NextFunction)=>{

       await authVerify.checkToken(req,res)
       
     const isvalidMaintainer =  await checkMaintainer(req,res)
      
    if(isvalidMaintainer){
       next()
    }
    }
}
