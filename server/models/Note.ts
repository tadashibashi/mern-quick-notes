import mongoose from "mongoose";
const Schema = mongoose.Schema;

import {INote} from "../interfaces";

export const noteSchema = new Schema<INote>({
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
