import {UserFormData} from "./types.ts";
import {getToken} from "./users-service.ts";

const BASE_URL = "/api/users";

type MethodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestInitEx = Partial<RequestInit & {headers: HeadersInit & Partial<{Authorization: string}>}>;


export async function sendRequest(url: RequestInfo|URL, method: MethodType="GET", payload: unknown=null) {

    const options: RequestInitEx = { method };

    if (payload) {
        options.headers = { "Content-Type": "application/json"};
        options.body = JSON.stringify(payload);
    }

    const token = getToken();
    if (token) {
        options.headers = options.headers || {};
        options.headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(url, options);
    if (res.ok) return res.json();
    throw new Error("Bad Request. Code " + res.status + ": " + res.statusText);
}


export async function signUp(userData: UserFormData) {
    return sendRequest(BASE_URL, "POST", userData);
}


export function login(credentials: {username: string, password: string}) {
    return sendRequest(`${BASE_URL}/login`, "POST", credentials);
}


export async function checkToken() {
    return sendRequest(`${BASE_URL}/check-token`);
}
