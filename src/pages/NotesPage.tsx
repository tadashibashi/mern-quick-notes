import {useContext, useState} from "react";
import {checkToken} from "../utilities/users-service.ts";
import {UserContext} from "../App";

function NotesPage() {
    const [expires, setExpires] = useState<Date|null>(null);
    const userCtx = useContext(UserContext);

    async function handleCheckToken() {
        const expDate = await checkToken();
        if (expDate) {
            setExpires(expDate);
        }
    }

    return (
        <div>
            <h1>{userCtx.user && userCtx.user.username + "'s"} Notes</h1>
            <button onClick={handleCheckToken}>Check when my login expires</button>
            {expires && <p>{expires.toString()}</p>}
        </div>
    );
}

export default NotesPage;
