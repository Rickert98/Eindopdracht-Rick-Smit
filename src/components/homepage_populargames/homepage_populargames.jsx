import styles from './homepage_populargames.module.css'
import addLibraryButton from '../../assets/add-box-line.png'
/*import addedLibraryButton from '../../assets/add-box-fill.png'*/
import addWishlistButton from '../../assets/heart-line.png'
/*import addedWishlistButton from '../../assets/heart-fill.png'*/

function PopularGames ({background_image, name, genre, rating, owned, playing, screenshot_one, screenshot_two}) {
    return(
        <section className={styles['popular-games']}>
            <h1>Popular</h1>
            <article className={styles['popular-wrapper']}>
                {/* Use the big image as a button to direct the user to the game detail page */}
                <button onClick={(() => {console.log("Moet nog linken naar game pagina")})} className={styles['image-wrapper']}>
                    <img src={background_image} className={styles['image']} alt='game image'/>
                </button>
                <div className={styles['gamedetail-screenshot-wrapper']}>
                    {/* Use the game's title as a button to direct the user to the game detail page */}
                    <button onClick={(() => {console.log("Moet nog linken naar game pagina")})} className={styles['game-title']}>
                        <h3>{name}</h3>
                    </button>
                    <p>{genre}</p>
                    <p>Owned by {owned} players</p>
                    <p>Currently {playing} playing</p>
                    <div className={styles['rating-button-wrapper']}>
                        <p>This game is rated {rating}/5</p>
                        <div>
                            <button onClick={(() => {console.log("Moet nog functie toevoegen")})} className={styles['add-buttons']}>
                                <img src={addLibraryButton} className={styles['add-button']} alt='add to library button'/>
                            </button>
                            <button onClick={(() => {console.log("Moet nog functie toevoegen")})} className={styles['add-buttons']}>
                                <img src={addWishlistButton} className={styles['add-button']} alt='add to wishlist button'/>
                            </button>
                        </div>
                    </div>
                    <div className={styles['screenshots-wrapper']}>
                        <img src={screenshot_one} className={styles['screenshot']} alt="game screenshot"/>
                        <img src={screenshot_two} className={styles['screenshot']} alt="game screenshot"/>
                    </div>
                </div>
            </article>
        </section>
    )
}

export default PopularGames

