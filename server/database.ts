
import mongoose from "mongoose";
import {getEnv} from "./env";

export default function config() {
    const DATABASE_URI = getEnv("DATABASE_URI");
    if (DATABASE_URI)
        mongoose.connect(DATABASE_URI).then(() => console.log("Connected to database."));
    else
        throw ReferenceError("Missing DATABASE_URI field in .env!");
}


