import {Request, NextFunction, Response} from "express";
import Note from "../../models/Note";

export async function createOne(req: Request, res: Response, next: NextFunction) {
    try {
        const note = new Note(req.body);
        note.user = req.user!._id; // user exists because middleware ensures it

        await note.save();
        res.json(note);
    } catch (err) {
        console.error(err);
        res.status(400).json({error: err});
    }
}

export async function updateOne(req: Request, res: Response, next: NextFunction) {
    try {
        const note = await Note.updateOne({_id: req.params["id"] as string}, req.body);
        if (!note) {
            res.status(404).json({error: "not found"});
            return;
        }

        res.json(note);
    } catch (err) {
        console.error(err);
        res.status(400).json({error: err});
    }
}

export async function readOne(req: Request, res: Response, next: NextFunction) {
    try {
        const note = await Note.findById(req.params["id"]);
        if (!note) {
            res.status(404).json({error: "not found"});
            return;
        }

        res.json(note);
    } catch (err) {
        console.error(err);
        res.status(400).json({error: err});
    }
}


export async function deleteOne(req: Request, res: Response, next: NextFunction) {
    try {
        await Note.deleteOne({_id: req.params["id"]});
    } catch(err) {
        console.error(err);
        res.status(400).json({error: err});
    }
}


export async function readUserOwned(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
        try {
            const notes = await Note.find({user: req.user._id}).sort({createdAt: "desc"});
            res.json(notes);
        } catch (err) {
            console.error(err);
            res.status(400).json({error: err});
        }
    } else {
        res.status(401).json({error: "unauthorized"});
    }
}
