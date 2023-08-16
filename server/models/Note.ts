import mongoose from "mongoose";
const Schema = mongoose.Schema;

import {INote} from "../interfaces";

export const noteSchema = new Schema<INote>({
    title: {
        type: String,
        required: true,
        default: "title",
    },
    text: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true
});

export default mongoose.model("Note", noteSchema);
