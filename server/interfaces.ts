import {UserDoc} from "./models/User.ts";

export interface IUser {
    username: string,
    email: string,
    password: string
}

export type RequestUser = Omit<UserDoc, "password">;

declare global {
    namespace Express {
        export interface Request {
            user?: RequestUser;
            exp?: Date;
        }
    }
}
