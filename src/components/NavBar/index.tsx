import {Link} from "react-router-dom";
import {UserContext} from "../../App";
import {useContext} from "react";

function NavBar() {
    const userCtx = useContext(UserContext);

    function handleLogOut() {
        userCtx.logout();
    }

    return (
        <nav>
            <Link to={"/notes"}>Notes </Link>|
            <Link to="" onClick={handleLogOut}>Log Out</Link>
        </nav>
    );
}

export default NavBar;
