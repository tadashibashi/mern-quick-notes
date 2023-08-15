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
            <a onClick={() => setSignUp(!signUp)}>{signUp ? "Already have an account? LOG IN" : "Don't have an account? SIGN UP"}</a>
        </div>
    );

}

export default AuthPage;
