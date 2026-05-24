import type { Request, Response } from "express";
import authService from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import { role as roles, type returnedUser, type User } from "../../types/index";
import { singToken, verifyJWT } from "../../utils/jwt";
import type { JwtPayload } from "jsonwebtoken";

export const signup = async(req: Request, res: Response) => {
    const { name, email, password, role } = req.body;

    if (!roles.includes(role)) {
        sendResponse(res, false, {
            message: "Validation Error",
            errors: "Invalid Role provided"
        }, 400);
        return;
    }
    
    const user = await authService.signup({ name, email, password, role });

    if (!user) {
        sendResponse(res, false, {
            message: "Registration Failed",
            errors: "Unable to register user"
        }, 409);
        return;
    }
    
    sendResponse(res, true, {
        message: "User registered successfully",
        data: user
    }, 201);
}

export const login = async(req: Request, res: Response) => {
    const { email, password } = req.body;

    const user: returnedUser | null = await authService.login({ email, password }); 

    if (!user) {
        sendResponse(res, false, {
            message: "Authentication Failed",
            errors: "User not found or invalid credentials"
        }, 404);
        return;
    }

    const { email: _, ...jwtSuitedUser } = user;
    const jwtToken = singToken(jwtSuitedUser);

    sendResponse(res, true, {
        message: "Login successful",
        data: {
            Token: jwtToken,
            user: user
        }
    }, 200);
}

export const checkValidUserRole = async (req: Request) => {
    const token = req.headers.authorization as string;
    const decodedToken = await verifyJWT(token); 
        
    if (decodedToken) {
        const validrole = await verifyAccess(decodedToken);
        
        if (validrole) {
            req.user = {
                userId: decodedToken.id 
            };
            return true;
        }
        return false;
    }
    
    return false;
}

export const checkMaintainer = async(req: Request, res: Response) => {
    const token = req.headers.authorization as string;
    const decodedToken = await verifyJWT(token); 
  
    if (decodedToken) {
        const { id } = decodedToken;
        const retrivedUser = await authService.findUserById(id);
     
        if (retrivedUser && retrivedUser.role === "maintainer") {
           
            return true;
            
        }else if(retrivedUser.role==="contributor") {    

            
           sendResponse(res, false, {
                  message: "Authorization Failed",
                  errors: "Forbidden: You do not have maintainer privileges to edit this resource"
               }, 403);
               
                 return false

        }
         


    }
 
}

export const verifyAccess = async(user: JwtPayload) => {
    const { id } = user;     
    const retrivedUser = await authService.findUserById(id);

    if (retrivedUser) {
        if (roles.includes(retrivedUser.role)) {
            return true;
        }
    }
    
    return false;
}