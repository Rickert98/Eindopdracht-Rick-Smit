import axios from 'axios';
import { useEffect, useState, createContext} from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext ( {} );

function AuthContextProvider ({children}) {
    const navigate = useNavigate();
    const [isAuth, toggleIsAuth] = useState({
             isAuth: false,
             user: null,
             status: 'pending',
        });

    useEffect (() => {
        const token = localStorage.getItem('token')

        if ( token ) {
            const decoded = jwtDecode(token);
            void fetchUserData(decoded.userId, token);
        } else {
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }, [] );

    function login(JWT) {
        localStorage.setItem('token', JWT);

        const decoded = jwtDecode(JWT);

        void fetchUserData(decoded.userId, JWT)
        console.log("gebruiker is ingelogd")
    }

    function logout() {
        localStorage.clear;
        toggleIsAuth({
            isAuth: false,
            user: null,
            status: 'done',
        });

        navigate('/');
        console.log('Succesvol uitgelogd');
    }

    async function fetchUserData(id, token, redirectUrl) {
        try {
            const response = await axios.get(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/${id}`, {
                    headers: {
                        'novi-education-project-id': import.meta.env.VITE_NOVI_API_KEY,
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'accept': '*/*',
                    }
                });

            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    email: response.data.email,
                    id: response.data.id,
                },
                status: 'done',
            });

            if (redirectUrl) {
                navigate(redirectUrl);
            }
        } catch(e) {
            console.error(e);
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            })
        }
    }

    const contextData = {
        ...isAuth,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {isAuth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;