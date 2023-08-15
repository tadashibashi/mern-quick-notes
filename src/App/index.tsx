/**
 * App component
 */
import {useState, createContext} from 'react'
import {Route, Routes, useNavigate} from "react-router-dom";
import {AuthPage, NewOrderPage, OrderHistoryPage} from "../pages";
import './App.css';
import {NavBar} from "../components";
import {UserFormData} from "../utilities/types.ts";
import {IUser} from "../../server/interfaces.ts";
import * as usersService from "../utilities/users-service";

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
                <Route path="/orders/new" element={<NewOrderPage />} />
                <Route path="/orders" element={<OrderHistoryPage />} />
            </Routes>
        </>;

    async function signUp(formData: UserFormData) {
        try {
            const user = await usersService.signUp(formData);
            setUser(user);
            navigate("/orders");
        } catch {
            console.error("Error, failed to login");
        }
    }
    async function login(credentials: {username: string, password: string}) {
        try {
            const user = await usersService.login(credentials);
            setUser(user);
            navigate("/orders");
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

export default App
