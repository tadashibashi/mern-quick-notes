/**
 * App component
 */
import {useState, createContext} from 'react'
import {Route, Routes, useNavigate} from "react-router-dom";
import {AuthPage, NewNotePage, NotesPage} from "../pages";

import {NavBar} from "../components";
import {UserFormData} from "../utilities/types";
import {IUser} from "../../server/interfaces";
import * as usersService from "../utilities/users-service";

import './App.css';

interface User {
    username: string;
    token: string;
}

export interface UserContext {
    login: (credentials: {username: string, password: string}) => void;
    logout: () => void;
    signUp: (userData: UserFormData) => void;
    user: IUser | null;
}

// @ts-ignore
export const UserContext = createContext(null as UserContext);

function App() {
    const [user, setUser] = useState(null as null|IUser);
    const navigate = useNavigate();


    let page = !user ? <AuthPage /> :
        <>
            <NavBar />
            <Routes>
                <Route path="/notes/new" element={<NewNotePage />} />
                <Route path="/notes" element={<NotesPage />} />
            </Routes>
        </>;

    async function signUp(formData: UserFormData) {
        try {
            const user = await usersService.signUp(formData);
            setUser(user);
            navigate("/notes");
        } catch {
            console.error("Error, failed to login");
        }
    }

    async function login(credentials: {username: string, password: string}) {
        try {
            const user = await usersService.login(credentials);
            if (user) {
                setUser(user);
                navigate("/notes");
            }


        } catch {
            console.error("Error, failed to login");
        }
    }

    function logout() {
        setUser(null);
        usersService.logout();
    }


    return (
        <UserContext.Provider value={{user, signUp, login, logout}}>
            <div className="App">
                {page}
            </div>
        </UserContext.Provider>
    );
}

export default App;
