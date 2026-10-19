import styles from './homepage_populargames.module.css'

function PopularGames ({background_image, name, genre, rating, owned, playing, screenshot_one, screenshot_two}) {
    return(
        <section>
            <h1>Popular</h1>
            <article className={styles['popular-wrapper']}>
                <div className={styles['image-wrapper']}>
                    <img src={background_image} className={styles['image']} alt='game image'/>
                </div>
                <div className={styles['gamedetail-screenshot-wrapper']}>
                    <h3>{name}</h3>
                    <p>{genre}</p>
                    <p>{rating}</p>
                    <p>Owned by {owned} players</p>
                    <p>Currently {playing} playing</p>
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

