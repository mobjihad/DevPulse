import type { Response } from "express";


export function sendResponse<T>(res:Response , success: boolean, payload:{message?: unknown , data?: T }, status:number=200):void{

    const { message, data } = payload;

      res.status(status).json({
           success,
           message : message || "",
           data: data !== undefined? data : null
           
        })
}