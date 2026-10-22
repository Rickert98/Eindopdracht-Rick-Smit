/* 1.0 Imports =======================================================================================================*/
/* === 1.1 */
import React, {useContext} from 'react';
import {NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';




/* === 1.2 Styles import =============================================================================================*/
import './Navigation.css';

/* 2.0 Function Navigation ===========================================================================================*/
function Navigation() {
    const {isAuth, logout} = useContext(AuthContext);

    return (
        <nav>
            <ul className="nav_ul">
                <li className="nav_li">
                    <NavLink to="/">Home</NavLink>
                </li>
                <li className="nav_li">
                    <NavLink to="/wishlist">Wishlist</NavLink>
                </li>
                <li className="nav_li">
                    <NavLink to="/library">Library</NavLink>
                </li>


                {isAuth ?
                    <button type="button" onClick={logout}>Log uit</button>
                    :
                    <>
                        <li className="nav_li">
                            <NavLink to="/login">Login</NavLink>
                        </li>
                        <li className="nav_li">
                            <NavLink to="/register">Registreer</NavLink>
                        </li>
                    </>
                }
            </ul>
        </nav>
    )
}

export default Navigation