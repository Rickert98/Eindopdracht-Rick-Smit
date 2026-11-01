import {useState} from 'react';

import styles from './AddButton.module.css';

import addLibraryButton from '../../assets/add-box-line.png'
import addedLibraryButton from '../../assets/add-box-fill.png'



function AddButton ({idGame, library, addGame, deleteGame}) {
    const id = `add-button-${idGame}`;
    /* State that toggles when the game is allready owned. When owned use a different image src */
    const [isOwned, toggleIsOwned] = useState(Boolean(library?.data?.some((game) => game.gameId === idGame)))

    function handleChange(elementId){
        const checkbox = document.getElementById(elementId);

        if (checkbox.checked === true &&
            isOwned === false
        ) {
            console.log(`Game is being added to the user library`)
            addGame(idGame);
            toggleIsOwned(true);
            console.log(isOwned)
        } else {
            console.log(`Game is being deleted from the user library`)
            deleteGame(idGame);
            toggleIsOwned(false);
            console.log(isOwned)
        }
    }
    return (
        <label className={styles['Addbutton-label']}>
            <input type="checkbox" id={id} className={styles['Addbutton-input']} onClick={(() => {handleChange(id)})}/>
            <img
                src={isOwned === true ? addedLibraryButton : addLibraryButton}
                alt="add to library button"
            />
        </label>
    )
}

export default AddButton