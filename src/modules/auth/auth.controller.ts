import type { Request, Response } from "express";
import authService from "./auth.service";
import { sendResponse } from "../../utils";



export const signup= async(req: Request , res: Response) => {

    const {name,email,password,role} = req.body


    const user = await authService.signup({name,email,password,role})

    if(!user){
        sendResponse(res,false,{
            message:"Unable to register user"
        },409)
        return
    }
    sendResponse(res,true,{
        message:"User registered successfully",
        data:user

    }, 201)


}