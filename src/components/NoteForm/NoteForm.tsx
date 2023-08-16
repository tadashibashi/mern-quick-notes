import {Note} from "../Note/Note";
import {FormEvent, useState} from "react";

interface FormData {
    title: string;
    text: string;
}

function NoteForm({note, rows, createNote}: {note?: Note, rows?: number, createNote: (note: FormData) => void}) {
    const [formData, setFormData] = useState<FormData>({
        title: note ? note.title : "",
        text: note ? note.text : "",
    });

    function handleOnChange(evt: FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const target = evt.currentTarget;
        setFormData({...formData, [target.name]: target.value });
    }

    function handleSubmit(evt: FormEvent) {
        evt.preventDefault();
        createNote(formData);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Title"
                   value={formData.title} onChange={handleOnChange} required/>

            <textarea name="text" rows={rows || 20} placeholder="Note"
                      value={formData.text} onChange={handleOnChange} required/>

            <button type="submit">Add Note</button>
        </form>
    );
}

export default NoteForm;
