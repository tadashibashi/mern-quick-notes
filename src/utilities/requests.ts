import {getToken} from "./users-service.ts";

type MethodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export async function sendRequest(url: RequestInfo|URL, method: MethodType="GET", payload: unknown=null) {

    const options: RequestInit  = { method };

    if (payload) {
        options.headers = { "Content-Type": "application/json"};
        options.body = JSON.stringify(payload);
    }

    const token = getToken();
    if (token) {
        const headers: HeadersInit & {Authorization?: string} = options.headers || {};

        if (headers)
            headers["Authorization"] = `Bearer ${token}`;
        options.headers = headers;
    }

    const res = await fetch(url, options);
    if (res.ok) return res.json();
    throw new Error("Bad Request. Code " + res.status + ": " + res.statusText);
}