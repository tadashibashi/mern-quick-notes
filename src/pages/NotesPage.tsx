import {useContext, useState} from "react";
import {checkToken} from "../utilities/users-service.ts";
import {UserContext} from "../App";
import {Note} from "../components/Note/Note";
import NoteForm from "../components/NoteForm/NoteForm";

function NotesPage() {
    const [expires, setExpires] = useState<Date|null>(null);
    const [notes, setNotes] = useState<Note[]>([]);
    const userCtx = useContext(UserContext);

    async function createNote(note: {title: string, text: string}) {

    }

    return (
        <div>
            <h1>{userCtx.user && userCtx.user.username + "'s "}Notes</h1>

            <NoteForm createNote={createNote} />
            {expires && <p>{expires.toString()}</p>}
        </div>
    );
}

export default NotesPage;
