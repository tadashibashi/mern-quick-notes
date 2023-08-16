import {UserFormData} from "./types.ts";
import {sendRequest} from "./requests.ts";

const BASE_URL = "/api/users";


export async function signUp(userData: UserFormData) {
    return sendRequest(BASE_URL, "POST", userData);
}


export function login(credentials: {username: string, password: string}) {
    return sendRequest(`${BASE_URL}/login`, "POST", credentials);
}


export async function checkToken() {
    return sendRequest(`${BASE_URL}/check-token`);
}
