import config from "../config";
import { verifyAccess } from "../modules/auth/auth.controller";
import type {jtwSuitedUser } from "../types";
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