import {useState} from 'react';
import axios from "axios";

function Login () {
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
                        'novi-education-project-id': `e44034d1-eedb-43e6-891e-754b1b07d51b`,
                        'Content-Type': 'application/json',
                        'accept': '*/*',
                    }
                })
            console.log(response);
            toggleRegistered(true);
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