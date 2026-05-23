import type { Request, Response } from "express";
import authService from "./auth.service";
import { sendResponse } from "../../utils";
import {role as roles, type returnedUser} from "../../types/index"
import { singToken } from "../../utils/signJWTToken";


export const signup= async(req: Request , res: Response) => {

    const {name,email,password,role} = req.body

    if(!roles.includes(role)){
             sendResponse(res,false,{
            message:"Invalid Role"
        },400)
        return
    }
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

export const login = async(req: Request , res: Response) =>{

    const {email,password} = req.body

    const user: returnedUser | null = await authService.login({email,password}); 

    if(!user){
        sendResponse(res, false, {
            message:"User Not found",
        
            
        },404)
        return
    }

    const {email: _, ...jwtSuitedUser } = user

    const jwtToken = singToken(jwtSuitedUser)

    sendResponse(res, true , {
        message:"Login successful",
        data: {
            Token: jwtToken,
            user: user}
    },200)


}