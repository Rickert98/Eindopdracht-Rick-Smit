import {useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom'

function Register () {
    const navigate = useNavigate();
    /* Set States for the form and for errors */
    const [formState, setFormState] = useState({
        email: '',
        password: '',
    });
    const [error, toggleError] = useState(false);

    function handleChange(e) {
        const changedFieldName = e.target.name;

        setFormState({
            ...formState,
            [changedFieldName]: e.target.value,
        })
    }

    /* function to post new user in NOVI api */
    async function formSubmit (e) {
        e.preventDefault();
        toggleError(false);

        /* Register new user with only the email and the password to the api/users endpoint, according to the api rules */
        try {
            const response = await axios.post(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/users`,
                {
                    "email": `${formState.email}`,
                    "password": `${formState.password}`,
                    "roles": [
                        "user"
                    ],
                },
                {
                    headers: {
                        'novi-education-project-id': import.meta.env.VITE_NOVI_API_KEY,
                        'Content-Type': 'application/json',
                        'accept': '*/*',
                    }
                })
            console.log(response);
            /* When succesfully registered. direct user to login page */
            navigate('/login')

        } catch(e) {
            console.error(e);
            toggleError(true);
        }
    }

    return (
        <section>
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
                    <button type='Submit'>Registreren</button>
                    {error === true ? <p>Iets is fout gegaan. Probeer opnieuw</p> : ''}
                </fieldset>
            </form>
        </section>
    )
}

export default Register