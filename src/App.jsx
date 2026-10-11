/* 1.0 Imports =======================================================================================================*/
/* === 1.1 */
import { Routes, Route } from 'react-router-dom';

/* === 1.2 Styles import =============================================================================================*/

/* === 1.3 Components import =========================================================================================*/
import Navigation from './components/nav/Navigation.jsx';
import Home from './pages/home/Home.jsx';
import Wishlist from './pages/wishlist/Wishlist.jsx';
import Library from './pages/library/Library.jsx';


/* 2.0 Function App ==================================================================================================*/
function App() {
    return (
        <>
            {<Navigation/>}
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/wishlist" element={<Wishlist/>}/>
                <Route path="/library" element={<Library/>}/>
            </Routes>
        </>
    )
}

export default App