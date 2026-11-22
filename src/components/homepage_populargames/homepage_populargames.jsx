import styles from './homepage_populargames.module.css'
import {useNavigate} from 'react-router-dom';


function PopularGames (props) {
    const navigate = useNavigate();
    return(
        <section className={styles['popular-games']}>
            <h1>Popular</h1>
            <article className={styles['popular-wrapper']}>
                {/* Use the big image as a button to direct the user to the game detail page */}
                <button onClick={(() => {navigate(`/game/${props.id}`)})} className={styles['image-wrapper']}>
                    <img src={props.background_image} className={styles['image']} alt='game image'/>
                </button>
                <div className={styles['gamedetail-screenshot-wrapper']}>
                    {/* Use the game's title as a button to direct the user to the game detail page */}
                    <button onClick={(() => {navigate(`/game/${props.id}`)})} className={styles['game-title']}>
                        <h3>{name}</h3>
                    </button>
                    <p>{props.genre}</p>
                    <p>Owned by {props.owned} players</p>
                    <p>Currently {props.playing} playing</p>
                    <div className={styles['rating-button-wrapper']}>
                        <p>This game is rated {props.rating}/5</p>
                        {props.children}
                    </div>
                    <span className={styles['screenshots-wrapper']}>
                        <img src={props.screenshot_one} className={styles['screenshot']} alt="game screenshot"/>
                        <img src={props.screenshot_two} className={styles['screenshot']} alt="game screenshot"/>
                    </span>
                </div>
            </article>
        </section>
    )
}

export default PopularGames

