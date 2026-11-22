import {useEffect, useContext, useState} from 'react';
import axios from 'axios';

import styles from './AddButton.module.css';


import addLibraryButton from '../../assets/add-box-line.png'
import addedLibraryButton from '../../assets/add-box-fill.png'
import {AuthContext} from "../../context/AuthContext.jsx";

function AddButton ({label, gameDetails, library}) {
    const id = `add-button-${gameDetails.id}`;
    /* State that toggles when the game is allready owned. When owned use a different image src */
    const [isOwned, toggleIsOwned] = useState(Boolean());
    const [labeltext, setLabeltext] = useState('Add this game to your library');
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const [userLibrary, setUserLibrary] = useState(library);

    const API_URL_NOVI = `https://novi-backend-api-wgsgz.ondigitalocean.app/api/userLibrary/`;

    /* ================================================================================================================
    *                   Checks if the game is owned. Toggles the isOwned State.
    *                   Updates everytime userLibrary State is updated.
    */
    useEffect (() => {
        const response =  library.find((game) => game.title === gameDetails.name);
       if (response) {
           toggleIsOwned(true);
       } else {
           toggleIsOwned(false);
       }
    }, [userLibrary])

    /* =================================================================================================================
        *               When checkbox is clicked:
        *                       Is game owned?
        *                           - Yes: Add game to userLibrary
            *                       - No:  Delete it from userLibrary
    */
    /* Functions for adding or deleting game from userLibrary in backend */
    async function addLibraryGame() {
        try {
            const response = await axios.post(API_URL_NOVI,{
                "userId": user.id,
                "gameId": gameDetails.id,
                "title": gameDetails.name,
                "genre": gameDetails.genres.map((genre)=>{return genre.name}).join(', '),
                "background": gameDetails.background_image,
                "platforms": gameDetails.platforms.map((platform)=>{return platform.platform.name}).join(', ')
            }, {
                headers: {
                    'novi-education-project-id': import.meta.env.VITE_NOVI_API_KEY,
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'accept': '*/*',
                }
            });
            console.log("game has been added to your library")
            console.log(response)

            /* Update the library state so the button updates*/
            setUserLibrary(userLibrary => [...userLibrary, response.data])
            library.push(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    async function deleteLibraryGame() {
        try {
            /* First find the entry key of this specific game in the userslibrary */
            const gameIdLibrary = await axios.get(API_URL_NOVI, {
                params: {
                    "userId": user.id,
                    "gameId": gameDetails.id,
                },
                headers: {
                    'novi-education-project-id': import.meta.env.VITE_NOVI_API_KEY,
                    'Content-Type': 'application/json',
                    'accept': '*/*',
                }
            });
            console.log(gameIdLibrary);
            /* Use the entry key in the endpoint*/
            if (gameIdLibrary) {
                const deleteGame = await axios.delete(`${API_URL_NOVI}${gameIdLibrary.data[0].id}`,{
                    headers: {
                        'novi-education-project-id': import.meta.env.VITE_NOVI_API_KEY,
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'accept': '*/*',
                    }
                });
                console.log("Game is succesfully deleted from the user library ")
                console.log(deleteGame);
                /* Delete the entry from library State so the button updates */
                const library_entry = library.findIndex(game => game.title === gameDetails.name);
                library.splice(library_entry,1,0)
            }
        } catch (e) {
            console.error(e);
        }
    }

    /* Check if game is owned or not */
    function handleChange(elementId){
        const checkbox = document.getElementById(elementId);

        /* If not owned -> add game to backend library and set isOwned state to true */
        if (checkbox.checked === true &&
            isOwned === false
        ) {
            addLibraryGame();
            toggleIsOwned(true);
            /* Set label text */
            setLabeltext("This game is part of your library");
        } else {
            /* If not owned -> delete game from backend library and set isOwned State to false */
            deleteLibraryGame()
            toggleIsOwned(false);
            /* Set label text */
            setLabeltext("Add this game to your library");
        }
    }
    /* ============================================================================================================== */

    return (
        <label className={styles['Addbutton-label']}>
            {label === true ? `${labeltext}` : ""}
            <input type="checkbox" id={id} className={styles['Addbutton-input']} onClick={(() => {handleChange(id)})}/>
            <img
                src={isOwned === true ? addedLibraryButton : addLibraryButton}
                alt="add to library button"
            />
        </label>
    )
}

export default AddButton