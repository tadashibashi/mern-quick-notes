import {UserDoc} from "./models/User.ts";
import mongoose from "mongoose";

export interface IUser {
    username: string,
    email: string,
    password: string
}

export interface INote {
    title: string;
    text: string;
    user: mongoose.ObjectId;
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
