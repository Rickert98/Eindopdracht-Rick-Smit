import styles from './homepage_gametile.module.css';
import {useNavigate} from 'react-router-dom';

function GameTile (props) {
    const navigate = useNavigate();
    return (
        <li className={styles['tile-wrapper']}>
                {/* Add a Onclick event to direct player to the game detail page */}
                <button className={styles['tile-button']} onClick={(() => {navigate(`/game/${props.id}`)})}>
                    <img src={props.background_image} alt='game image'/>
                    <h3 className={styles['tile-header']}>{props.name}</h3>
                </button>
                <div className={styles['tile-details']}>
                    <p>{props.genres}</p>
                    <p>{props.released}</p>
                    {props.children}
                </div>
        </li>
    )
}

export default GameTile