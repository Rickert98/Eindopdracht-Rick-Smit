/* 1.0 Imports =======================================================================================================*/
/* === 1.1 */
import React from 'react';
import { NavLink } from 'react-router-dom';

/* === 1.2 Styles import =============================================================================================*/

/* 2.0 Function Navigation ===========================================================================================*/
function Navigation() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/wishlist">Wishlist</NavLink>
                </li>
                <li>
                    <NavLink to="/library">Library</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation