import {useState} from 'react';

import styles from './AddButton.module.css';

import addLibraryButton from '../../assets/add-box-line.png'
import addedLibraryButton from '../../assets/add-box-fill.png'



function AddButton ({label, gameDetails, library, addGame, addGameLibrary, deleteGame}) {
    const id = `add-button-${gameDetails.id}`;
    /* State that toggles when the game is allready owned. When owned use a different image src */
    const [isOwned, toggleIsOwned] = useState(Boolean(library?.data?.some((game) => game.gameId === gameDetails)));
    const [labeltext, setLabeltext] = useState('Add this game to your library');

    function handleChange(elementId){
        const checkbox = document.getElementById(elementId);

        if (checkbox.checked === true &&
            isOwned === false
        ) {
            console.log(`Game is being added to the user library`)
            console.log(gameDetails)
            addGame({
                ...addGameLibrary,
                gameId: gameDetails.id,
                title: gameDetails.name,
                genres: gameDetails.genres.map((genre)=>{return genre.name}).join(', '),
                background: gameDetails.background_image,
                platforms: gameDetails.platforms.map((platform)=>{return platform.platform.name}).join(', ')
            });
            toggleIsOwned(true);
            console.log(isOwned);
            setLabeltext("This game is part of your library");
        } else {
            console.log(`Game is being deleted from the user library`);
            deleteGame(gameDetails.id);
            toggleIsOwned(false);
            console.log(isOwned);
            setLabeltext("Add this game to your library");
        }
    }
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