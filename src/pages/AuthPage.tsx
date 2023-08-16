import {useContext, useState} from "react";

import SignUpForm from "../components/SignUpForm";
import {UserContext} from "../App";
import LoginForm from "../components/LoginForm";

function AuthPage() {
    const user = useContext(UserContext);
    const [signUp, setSignUp] = useState(true);
    return (
        <div>
            {signUp ? <SignUpForm user={user} /> : <LoginForm user={user} />}
            <div className="mt-2">
                <span>{signUp ? "Already have an account? " : "Don't have an account? "}</span>
                <a className="link" onClick={() => setSignUp(!signUp)}>{signUp ? "LOG IN" : "SIGN UP"}</a>
            </div>
        </div>
    );

}

export default AuthPage;
