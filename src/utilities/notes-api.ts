import {sendRequest} from "./requests";

const BASE_URL = "/api/notes"

export async function create(formData: {text: string}) {
    return await sendRequest(`${BASE_URL}/create`, "POST", formData);
}

export async function update(id: string, formData: {text: string}) {
    return await sendRequest(`${BASE_URL}/${id}`, "PUT");
}

export async function del(id: string) {
    return await sendRequest(`${BASE_URL}/${id}`, "DELETE");
}

export async function userNotes() {
    return await sendRequest(`${BASE_URL}`);
}
