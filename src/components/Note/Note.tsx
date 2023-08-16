import "./Note.css";
import * as notesService from "../../utilities/notes-service";
import React from "react";

export interface INote {
    title: string;
    text: string;
    _id: string;
    createdAt: string; // date string
    updatedAt: string; // date string
}

function Note({note, deleteNote}: {note: INote, deleteNote: (id: string) => void}) {

    async function onDeleteHandler(e: React.MouseEvent) {
        deleteNote(note._id);
    }

    return (
        <article className="Note">
            <div className="note-header">
                <button className="delete-btn" onClick={onDeleteHandler}>X</button>
                <h3>{note.title}</h3>
                <p className="text-tiny">created on: <span className="note-date">{new Date(note.createdAt).toLocaleDateString()}</span></p>
            </div>
            <hr />
            <div className="note-body">
                <p>{note.text}</p>
            </div>
        </article>
    );
}

export default Note;
