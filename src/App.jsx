/* 1.0 Imports =======================================================================================================*/
/* === 1.1 */
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import {useContext} from 'react';


/* === 1.2 Styles import =============================================================================================*/
import './App.css';

/* === 1.3 Components import =========================================================================================*/
import Navigation from './components/nav/Navigation.jsx';
import Home from './pages/home/Home.jsx';
import Profile from './pages/wishlist/Wishlist.jsx';
import Library from './pages/library/Library.jsx';
import Login from './pages/login/Login.jsx';
import Register from './pages/register/Register.jsx';
import GameDetail from './pages/game_detail/Game_detail.jsx';



/* 2.0 Function App ==================================================================================================*/
function App() {
    const {isAuth} = useContext(AuthContext);
    return (
        <>
            {<Navigation/>}
            <main className='outer-content-container'>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/userprofile/:userId" element={isAuth ? <Profile/> : <Navigate to="/"/>}/>
                    <Route path="/library" element={<Library/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="game/:id" element={<GameDetail/>}/>
                </Routes>
            </main>
        </>
    )
}

export default App