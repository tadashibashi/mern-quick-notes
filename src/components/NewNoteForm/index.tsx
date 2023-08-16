import {FormEvent, useRef, useState} from "react";
import {UserContext} from "../../App";

interface Props {
    user: UserContext;
}

interface State {
    passwordMismatch: boolean;
    error: string;
}

export default function NewNoteForm({user}: Props) {

    const formData = useRef<{text: string}>({
        text: "",
    });

    const [error, setError] = useState("");


    function handleOnChange(e: FormEvent<HTMLInputElement | HTMLSelectElement>) {
        const input = e.currentTarget;

        // make sure to set all inputEl.name to the correct values in FormData!
        formData.current[input.name as "text"] = input.value;
    }

    function submitHandler(e: FormEvent) {
        e.preventDefault();
        try {
            //user.login(formData.current);
        } catch {
            setError("Log-in failed - Try Again");
        }
    }

    return (
        <>
            <h1>Log In</h1>
            <div className="form-container">
                {error && <p>{error}</p>}
                <form autoComplete="off" onSubmit={submitHandler}>
                    <label>Username</label>
                    <input type="text" name="username" required onChange={handleOnChange}/>

                    <label>Password</label>
                    <input type="password" name="password" required onChange={handleOnChange}/>

                    <div>
                        <button type="submit">Log In</button>
                    </div>
                </form>
            </div>
        </>


    );
}