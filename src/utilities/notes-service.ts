import * as notesAPI from "./notes-api";

export async function create(formData: {title: string, text: string}) {
    return await notesAPI.create(formData);
}

export async function update(noteId: string, formData: {text: string}) {
    return await notesAPI.update(noteId, formData);
}

export async function del(noteId: string) {
    return await notesAPI.del(noteId);
}

export async function userNotes() {
    return await notesAPI.userNotes();
}
