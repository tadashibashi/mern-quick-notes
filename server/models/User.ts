import bcrypt from "bcrypt";
import mongoose from "mongoose";
import {IUser} from "../interfaces";
const Schema = mongoose.Schema;

const SALT_ROUNDS = 10;

const userSchema = new Schema<IUser>({
    username: {type: String, trim: true, required: true},
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: true,
    },
    password: {
        type: String,
        minLength: 3,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            delete ret.password;
            return ret;
        }
    }
});


export async function hashPassword(password: string) {
    return await bcrypt.hash(password.trim(), SALT_ROUNDS);
}

export function comparePasswords(password: string, encrypted: string) {
    return bcrypt.compareSync(password.trim(), encrypted);
}


userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();

    this.password = await hashPassword(this.password);
});

export type UserDoc = IUser & {_id: mongoose.ObjectId, createdAt: Date, updatedAt: Date};

export default mongoose.model("User", userSchema);
