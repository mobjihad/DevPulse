import type { NextFunction, Request, Response } from "express"
import authVerify from "../utils/authUtis"

export const validatedToUpdate = () =>{

    return async(req: Request , res: Response, next: NextFunction)=>{

         
            await authVerify.checkToken(req,res)
              if (res.headersSent) return;
            await authVerify.checkValidRole(req,res)
              if (res.headersSent) return;
            await authVerify.checkAllowedToedit(req,res)
              if (res.headersSent) return;

             next()



    }
}