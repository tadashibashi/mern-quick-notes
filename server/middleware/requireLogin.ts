import {Request, Response, NextFunction} from "express";

export default function requireLogin() {
    return function(req: Request, res: Response, next: NextFunction) {
        if (!req.user) {
            return res.status(401).json("Unauthorized");
        }

        next();
    }
}