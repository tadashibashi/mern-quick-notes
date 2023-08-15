import {NextFunction, Request, Response} from "express";
import User, {comparePasswords, hashPassword} from "../../models/User";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import {IUser} from "../../interfaces";

async function create(req: Request, res: Response, next: NextFunction) {

    try {
        console.log(req.body);
        const user = await User.create(req.body);
        const token = createJWT(user);
        res.json(token);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
}

async function login(req: Request, res: Response, next: NextFunction) {
    try {
        // ensure that the fields exist
        if (!req.body.password)
            req.body.password = "";
        if (!req.body.username)
            req.body.username = "";

        const user = await User.findOne({username: req.body.username});
        if (!user) {
            res.status(400).json({error: "user does not exist"});
            return;
        }

        if (!comparePasswords(req.body.password, user.password)) {
            res.status(400).json({error: "invalid password"});
            return;
        }

        res.json(createJWT(user));
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
}




async function checkToken(req: Request, res: Response, next: NextFunction) {
    console.log("user", req.user);
    res.json(req.exp);
}

export default {
    create,
    login,
    checkToken,
}

function createJWT(user: mongoose.Document<unknown, {}, IUser>) {
    return jwt.sign(
        {user},
        process.env["SECRET"] as string,
        {expiresIn: "24h"},
    );
}