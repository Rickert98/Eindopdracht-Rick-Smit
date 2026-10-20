import styles from './homepage_gametile.module.css';
import addLibraryButton from '../../assets/add-box-line.png'
/*import addedLibraryButton from '../../assets/add-box-fill.png'*/
import addWishlistButton from '../../assets/heart-line.png'
/*import addedWishlistButton from '../../assets/heart-fill.png'*/

function GameTile ({background_image, name, genres, released}) {
    return (
        <li className={styles['tile-wrapper']}>
                {/* Add a Onclick event to direct player to the game detail page */}
                <button className={styles['tile-button']} onClick={(() => {console.log("Moet nog linken naar game pagina")})}>
                    <img src={background_image} alt='game image'/>
                    <h3 className={styles['tile-header']}>{name}</h3>
                </button>
                <div className={styles['tile-details']}>
                    <p>{genres}</p>
                    <p>{released}</p>
                    <span>
                        <button className={styles['add-buttons']} onClick={(() => {console.log("Moet nog functie toevoegen")})}>
                            <img src={addLibraryButton} alt="add to library button"/>
                        </button>
                        <button className={styles['add-buttons']} onClick={(() => {console.log("Moet nog functie toevoegen")})}>
                            <img src={addWishlistButton} alt="add to wishlist button"/>
                        </button>
                    </span>
                </div>
        </li>
    )
}

export default GameTile