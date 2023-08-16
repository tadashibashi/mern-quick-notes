import mongoose from "mongoose";

export interface Note {
    title: string;
    text: string;
    _id: string;
    createdAt: string; // date string
    updatedAt: string; // date string
}

function Note({note}: {note: Note}) {

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