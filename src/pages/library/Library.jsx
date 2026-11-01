import {useContext, useEffect, useState} from 'react'

import fetchUserLibrary from '../../helpers/fetchUserLibrary';
import {AuthContext} from "../../context/AuthContext.jsx";


function Library () {
    const [userLibrary, setUserLibrary] = useState([]);

    const { user } = useContext(AuthContext);

    useEffect(()=>{
        fetchUserLibrary(user.id, setUserLibrary)
    },[]);





    return (
        <>
            <h1>Your library</h1>

        </>
    )
}

export default Library