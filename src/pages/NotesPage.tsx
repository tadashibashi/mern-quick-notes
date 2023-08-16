import {useState} from "react";
import {checkToken} from "../utilities/users-service.ts";

function OrderHistoryPage() {
    const [expires, setExpires] = useState<Date|null>(null);

    async function handleCheckToken() {
        const expDate = await checkToken();
        if (expDate) {
            setExpires(new Date(expDate));
        }

    }

    return (
        <div>
            <h1>OrderHistoryPage</h1>
            <button onClick={handleCheckToken}>Check when my login expires</button>
            {expires && <p>{expires.toString()}</p>}
        </div>
    );
}

export default OrderHistoryPage;
