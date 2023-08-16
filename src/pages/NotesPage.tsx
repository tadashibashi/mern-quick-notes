import {useContext, useEffect, useState} from "react";
import * as notesService from "../utilities/notes-service.ts";
import {UserContext} from "../App";
import Note, {INote} from "../components/Note/Note";
import NoteForm from "../components/NoteForm/NoteForm";


function NotesPage() {
    const [notes, setNotes] = useState<INote[]>([]);
    const [notesDirty, setNotesDirty] = useState(true);

    const [reversed, setReversed] = useState(false);
    const userCtx = useContext(UserContext);

    useEffect(() => {
        async function updateNotes() {
            const notes: INote[] = await notesService.userNotes();
            setNotes(notes);
        }
        if (notesDirty) {
            updateNotes();
            setNotesDirty(false);
        }
    }, [notesDirty]);

    async function createNote(note: {title: string, text: string}) {
        const newNote = await notesService.create(note);
        setNotesDirty(true);
    }

    async function deleteNote(id: string) {
        const res = await notesService.del(id);
        if (res.success)
            setNotesDirty(true);
    }

    const noteEls = notes.map(note => <Note key={note._id} note={note} deleteNote={deleteNote} />);

    if (reversed)
        noteEls.reverse();

    return (
        <div>
            <h1>{userCtx.user && userCtx.user.username + "'s "}Notes</h1>
            <h2>New Note</h2>
            <NoteForm createNote={createNote} />
            <hr />
            <button className="text-tiny" onClick={()=> setReversed(!reversed)}>
                {reversed ? "oldest to newest" : "newest to oldest"}
            </button>
            <div className="notes-container">
                {noteEls}
            </div>
        </div>
    );
}

export default NotesPage;
