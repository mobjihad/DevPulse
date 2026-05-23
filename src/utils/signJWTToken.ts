import config from "../config";
import type {jtwSuitedUser } from "../types";
import jwt from "jsonwebtoken"

export const singToken=(payload: jtwSuitedUser )=>{

    const accessToken =  jwt.sign(payload, config.jwt_secret,{
        expiresIn :"1d"
    })

    return accessToken;


}