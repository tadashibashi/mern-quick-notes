import dotenv from "dotenv";
dotenv.config();

export function getEnv(key: string): string | undefined {
    return process.env[key];
}

export function reqEnv(key: string): string {
    const value = process.env[key];
    if (value === undefined)
        throw ReferenceError("Missing reference to required env var: \"" + key + "\"");
    return value;
}