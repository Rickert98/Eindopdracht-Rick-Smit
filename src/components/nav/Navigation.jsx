/* 1.0 Imports =======================================================================================================*/
/* === 1.1 */
import React from 'react';
import { NavLink } from 'react-router-dom';

/* === 1.2 Styles import =============================================================================================*/
import './Navigation.css';

/* 2.0 Function Navigation ===========================================================================================*/
function Navigation() {
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
            </ul>
        </nav>
    )
}

export default Navigation