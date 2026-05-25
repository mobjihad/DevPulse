import config from "../config/index.js";
import { verifyAccess } from "../modules/auth/auth.controller.js";
import type {jtwSuitedUser } from "../types/index.js";
import jwt, { type JwtPayload } from "jsonwebtoken"

export const singToken=(payload: jtwSuitedUser )=>{

    const accessToken =  jwt.sign(payload, config.jwt_secret,{
        expiresIn :"1d"
    })

    return accessToken;


}

export const verifyJWT = async(token: string) =>{

    const decodedToken = await jwt.verify(token, config.jwt_secret) as JwtPayload

   
     return decodedToken; 


}