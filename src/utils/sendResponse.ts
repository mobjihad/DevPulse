
import type { Response } from "express";

export function sendResponse<T>(
    res: Response, 
    success: boolean, 
    payload: { message?: string; data?: T; errors?: any }, 
    status: number = 200
): void {
    const { message, data, errors } = payload;

    
    if (success) {
        res.status(status).json({
            success: true,
            ...(message && { message }),
            ...(data !== undefined && { data })
        });
        return; 
    }

    res.status(status).json({
        success: false,
        message: message || "Operation failed",
        errors: errors || message || "Unknown error" 
    });
}