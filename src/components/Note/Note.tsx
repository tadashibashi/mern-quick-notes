import mongoose from "mongoose";

export interface INote {
    title: string;
    text: string;
    _id: string;
    createdAt: string; // date string
    updatedAt: string; // date string
}

function Note({note}: {note: INote}) {

    return (
        <article>
            <div className="note-header">
                <h3>{note.title}</h3>
                <p>last updated: <span className="note-date">{new Date(note.updatedAt).toString()}</span></p>
            </div>
            <div className="note-body">
                <p>{note.text}</p>
            </div>
        </article>
    );
}

export default Note;
