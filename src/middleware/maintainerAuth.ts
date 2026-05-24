import type { NextFunction, Request, Response } from "express"
import type { Role } from "../types"
import authVerify from "../utils/authUtis"
import {  checkMaintainer } from "../modules/auth/auth.controller"


export const authorisedMaintainer = (authorised: Role)=>{

    
    return async(req: Request, res: Response, next: NextFunction)=>{

       await authVerify.checkToken(req,res)
       
     const isvalidMaintainer =  await checkMaintainer(req,res)
      
    if(isvalidMaintainer){
       next()
    }
    }
}
