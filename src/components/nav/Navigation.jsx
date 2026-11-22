/* 1.0 Imports =======================================================================================================*/
/* === 1.1 */
import React, {useContext} from 'react';
import {NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

/* === 1.2 Styles import =============================================================================================*/
import './Navigation.css';

/* 2.0 Function Navigation ===========================================================================================*/
function Navigation() {
    const {isAuth, logout, user} = useContext(AuthContext);

    return (
        <nav>
            <ul className="nav_ul">
                <li className="nav_li">
                    <NavLink className={({isActive})=> isActive ? 'nav-link-active' : 'nav-link-inactive'} to="/">Home</NavLink>
                </li>

                <li className="nav_li">
                    <NavLink className={({isActive})=> isActive ? 'nav-link-active' : 'nav-link-inactive'} to="/library">Library</NavLink>
                </li>


                {isAuth ?
                    <>
                        <li className="nav_li">
                            <NavLink className={({isActive})=> isActive ? 'nav-link-active' : 'nav-link-inactive'} to={`/userprofile/${user.id}`}>Profile</NavLink>
                        </li>
                        <button type="button" onClick={(() =>{logout()})}>Log uit</button>
                    </>
                    :
                    <>
                        <li className="nav_li">
                            <NavLink className={({isActive})=> isActive ? 'nav-link-active' : 'nav-link-inactive'} to="/login">Login</NavLink>
                        </li>
                        <li className="nav_li">
                            <NavLink className={({isActive})=> isActive ? 'nav-link-active' : 'nav-link-inactive'} to="/register">Registreer</NavLink>
                        </li>
                    </>
                }
            </ul>
        </nav>
    )
}

export default Navigation