import type { NextFunction, Request, Response } from "express";
import config from "../config";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    
  
    const statusCode = err.statusCode || 500;
    
    
    const message = err.message || "Internal Server Error";

   
    res.status(statusCode).json({
        success: false,
        message: message,
      
        errors: err, 
       
        ...(config.environment === "development" && { stack: err.stack }) 
    });
};