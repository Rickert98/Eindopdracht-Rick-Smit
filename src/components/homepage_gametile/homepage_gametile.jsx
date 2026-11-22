import styles from './homepage_gametile.module.css';


import {useNavigate} from 'react-router-dom';

function GameTile ({background_image, name, genres, released, id}) {
    const navigate = useNavigate();
    return (
        <li className={styles['tile-wrapper']}>
                {/* Add a Onclick event to direct player to the game detail page */}
                <button className={styles['tile-button']} onClick={(() => {navigate(`/game/${id}`)})}>
                    <img src={background_image} alt='game image'/>
                    <h3 className={styles['tile-header']}>{name}</h3>
                </button>
                <div className={styles['tile-details']}>
                    <p>{genres}</p>
                    <p>{released}</p>
                </div>
        </li>
    )
}

export default GameTile