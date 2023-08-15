import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {reqEnv} from "../env";

const AUTH_SCHEME = "Bearer ";

export default function injectUser() {
    return async function(req: Request, res: Response, next: NextFunction) {

        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith(AUTH_SCHEME)) {
            const payload = jwt.verify(authHeader.substring(AUTH_SCHEME.length),
                reqEnv("SECRET"));

            if (payload && typeof payload === "object") {
                if (payload.user && payload.exp) {
                    req.user = payload.user;
                    req.exp = new Date(payload.exp * 1000);
                }
            }
        }

        next();
    }
}
