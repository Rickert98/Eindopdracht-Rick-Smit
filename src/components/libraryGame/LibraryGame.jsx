import styles from './LibraryGame.module.css'

function LibraryGameArticle ({game, filters}) {
    /* When filter is set to "All games" show all games in library */
    if (filters==="All games") {
        return (
            <li className={styles['list-item']}>
                <button className={styles['button']}>
                    <div className={styles['image-wrapper']}>
                        <img src={game.background} alt="background image" className={styles['image']}/>
                    </div>
                    <div className={styles['details-wrapper']}>
                        <h2 className={styles['details-header']}>{game.title}</h2>
                        <p className={styles['detail']}>{game.platforms}</p>
                    </div>
                </button>
            </li>
        )
    } else {
        if (game.genre.includes(filters)) {
            return (
                <li className={styles['list-item']}>
                    <button className={styles['button']}>
                        <div className={styles['image-wrapper']}>
                            <img src={game.background} alt="background image" className={styles['image']}/>
                        </div>
                        <div className={styles['details-wrapper']}>
                            <h2 className={styles['details-header']}>{game.title}</h2>
                            <p className={styles['detail']}>{game.platforms}</p>
                        </div>
                    </button>
                </li>
            )
        }
    }

}

export default LibraryGameArticle