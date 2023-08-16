import "./Note.css";

export interface INote {
    title: string;
    text: string;
    _id: string;
    createdAt: string; // date string
    updatedAt: string; // date string
}

function Note({note}: {note: INote}) {

    return (
        <article className="Note">
            <div className="note-header">
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
