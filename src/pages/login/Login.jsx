import {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { AuthContext } from '../../context/AuthContext.jsx';

import './Login.css';

function Login () {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    /* Set States for the form and for errors */
    const [error, toggleError] = useState(false);
    const [formState, setFormState] = useState({
        email: '',
        password: '',
    });

    function handleChange(e) {
        const changedFieldName = e.target.name;

        setFormState({
            ...formState,
            [changedFieldName]: e.target.value,
        })
    }

    async function formSubmit (e) {
        e.preventDefault();
        toggleError(false);

        try {
            const response = await axios.post(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/login`,
                {
                    "email": `${formState.email}`,
                    "password": `${formState.password}`,
                },
                {
                    headers: {
                        'novi-education-project-id': import.meta.env.VITE_NOVI_API_KEY,
                        'Content-Type': 'application/json',
                        'accept': '*/*',
                    }
                })
            console.log(response);
            /* Sent token to the login function in the context  */
            login(response.data.token)

            /* When succesfully logged in direct the user to the homepage */
            navigate("/")
        } catch(e) {
            console.error(e);
            toggleError(true);
        }
    }

    return (
        <form onSubmit={formSubmit}>
            <fieldset className="login-register-form">
                <label className="login-register-label">
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label className="login-register-label">
                    Wachtwoord:
                    <input
                        type='text'
                        name="password"
                        value={formState.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type='Submit'>Inloggen</button>
                {error === true ? <p>Iets is fout gegaan. Probeer opnieuw</p> : ''}
            </fieldset>
        </form>
    )
}

export default Login