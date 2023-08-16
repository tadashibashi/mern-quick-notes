import {UserFormData} from "./types.ts";
import * as usersAPI from "./users-api.ts";
import {IUser} from "../../server/interfaces.ts";


/**
 * Attempt to sign up a user
 * @param userData form data to pass
 * @returns IUser user object or null if invalid credentials
 */
export async function signUp(userData: UserFormData) {
    const token = await usersAPI.signUp(userData);
    localStorage.setItem("token", token);
    return getUser();
}

/**
 * Attempt to log-in a user
 * @param credentials
 * @returns IUser user object or null if invalid credentials
 */
export async function login(credentials: {username: string, password: string}) {
    const token = await usersAPI.login(credentials);
    localStorage.setItem("token", token);

    return getUser();
}

export function logout() {
    localStorage.removeItem("token");
}


/**
 * Gets token if there's a valid one in localStorage.
 * Returns null if not.
 */
export function getToken() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const payload = JSON.parse(atob(token.split(".")[1]));
    if (typeof payload.exp !== "number" || payload.exp < Date.now() / 1000.0) {
        localStorage.removeItem("token");
        return null;
    }

    return token;
}





/**
 * Get User object or return null
 */
export function getUser() {
    const token = getToken();
    return token ? JSON.parse(atob(token.split(".")[1])).user as IUser : null;
}

/**
 * Get the date when a logged-in user's token expires
 */
export async function checkToken() {
    return new Date(await usersAPI.checkToken());
}