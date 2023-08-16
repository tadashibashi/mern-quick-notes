import {INote} from "../Note/Note";
import {FormEvent, useState} from "react";

interface FormData {
    title: string;
    text: string;
}

function NoteForm({note, rows, createNote}: {note?: INote, rows?: number, createNote: (note: FormData) => void}) {
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
        setFormData({title: "", text: ""});
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input type="text" name="title" value={formData.title}
                   onChange={handleOnChange} required/>
            <label>Content</label>
            <textarea name="text" rows={rows || 20}
                      value={formData.text} onChange={handleOnChange} required/>

            <button type="submit">Add Note</button>
        </form>
    );
}

export default NoteForm;
