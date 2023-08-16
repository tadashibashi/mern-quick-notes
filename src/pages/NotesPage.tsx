import {useContext, useEffect, useState} from "react";
import * as notesService from "../utilities/notes-service.ts";
import {UserContext} from "../App";
import Note, {INote} from "../components/Note/Note";
import NoteForm from "../components/NoteForm/NoteForm";


function NotesPage() {
    const [notes, setNotes] = useState<INote[]>([]);
    const [notesDirty, setNotesDirty] = useState(true);
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

    return (
        <div>
            <h1>{userCtx.user && userCtx.user.username + "'s "}Notes</h1>

            <NoteForm createNote={createNote} />
            <div className="notes-container">
                {notes.map(note => <Note note={note}/>)}
            </div>
        </div>
    );
}

export default NotesPage;
