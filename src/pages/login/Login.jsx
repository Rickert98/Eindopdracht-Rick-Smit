import {useState} from 'react';

import Register from '../../components/register/Register.jsx';
import UserLogin from '../../components/login/Login.jsx';
import './Login.css';

function Login () {
    const [login, setLogin] = useState(true);

    return(
        <section className="login-register-form-wrapper">
            <div className="radiobuttons-wrapper">
                <label className="login-register-radiobutton">
                    <input type="radio" name="login-register" value="login" checked={login !== false } onClick={((e) => {
                        setLogin(e.target.value)
                    })}/>
                    Inloggen
                </label>
                <label className="login-register-radiobutton">
                    <input type="radio" name="login-register" value="register" checked={login === false} onClick={((e) => {
                        setLogin(!e.target.value)
                    })}/>
                    Registreren
                </label>
            </div>
            {login === false ?
            <Register/> : <UserLogin/>
            }
        </section>
    )
}

export default Login