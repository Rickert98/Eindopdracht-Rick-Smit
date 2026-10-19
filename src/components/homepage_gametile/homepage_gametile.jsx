import styles from './homepage_gametile.module.css';

function GameTile ({background_image, name, genres, released}) {
    return (
        <li className={styles['tile-wrapper']}>
            {/* Add a Onclick event here to direct player to the game detail page */}
            <button className={styles['tile-button']} onClick={(() => {console.log("Moet nog linken naar game pagina")})}>
                <span className={styles['tile-image-wrapper']}>
                    <img src={background_image} alt='game image'/>
                </span>
                <h2 className={styles['tile-header']}>{name}</h2>
                <div className={styles['tile-details']}>
                    <p>{genres}</p>
                    <p>{released}</p>
                </div>
            </button>
        </li>
    )
}

export default GameTile