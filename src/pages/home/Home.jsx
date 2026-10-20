import axios from 'axios';
import {useEffect, useState} from 'react';

import GameTile from '../../components/homepage_gametile/homepage_gametile.jsx';
import PopularGames from '../../components/homepage_populargames/homepage_populargames.jsx'

import './Home.css';

function Home () {
    /* Set States for storing game data */
    const [gamesPopular, setGamesPopular] = useState([]);
    const [popularCount, setPopularCount] = useState(0);
    const [gamesRecent, setGamesRecent] = useState([]);
    /* Set States for possible errors */


    /* Upon refresh fetch games from RAWG api */
    useEffect (() => {
        /* Fetch popular games */
        async function fetchPopularGames () {

            try {
                const result = await axios.get('https://api.rawg.io/api/games', {
                    params: {
                        key: import.meta.env.VITE_API_KEY,
                        page_size: 6,
                        ordering: '-added',
                    },
                })
                setGamesPopular (result.data.results)
                /* Run the handleCount function once so the slider is showing the correct game */
                handleCount(0)
                console.log(result);

            } catch (e){
                console.error(e);
            }
        }
        /* Fetch recent games */
        async function fetchRecentGames () {
            try {
                const result = await axios.get('https://api.rawg.io/api/games', {
                    params: {
                        key: import.meta.env.VITE_API_KEY,
                        page_size: 20,
                        ordering: '-released',
                        metacritic: '40, 100',
                    },
                })
                setGamesRecent (result.data.results)
                console.log(result);

            } catch (e){
                console.error(e);
            }
        }
        fetchPopularGames();
        fetchRecentGames();
    }, []);

    /* State popularCount cant be higher than the number of popular games in stored in the state gamesPopular.
    * Cant be lower than 0 */

    function handleCount (number) {
        if (number === gamesPopular.length) {
            setPopularCount(0);
            number = 0;
        } else {
            if (number < 0) {
                setPopularCount(gamesPopular.length - 1)
                number = gamesPopular.length - 1;
            } else {
                setPopularCount(number)
            }
        }
        let radiobtn = document.getElementById(`btn-radio${number}`);
        radiobtn.checked = true;
    }

    return (
        <>
            <div className='inner-content-container'>
                {/* Insert section Popular games */}
                {gamesPopular.length > 0 && (
                    <>
                        <PopularGames
                            key={gamesPopular[popularCount].id}
                            background_image={gamesPopular[popularCount].background_image}
                            name={gamesPopular[popularCount].name}
                            genre={gamesPopular[popularCount].genres[0].name}
                            rating={gamesPopular[popularCount].rating}
                            owned={gamesPopular[popularCount].added_by_status.owned}
                            playing={gamesPopular[popularCount].added_by_status.playing}
                            screenshot_one={gamesPopular[popularCount].short_screenshots[1].image}
                            screenshot_two={gamesPopular[popularCount].short_screenshots[2].image}
                        />
                        <span className="popular-slider">
                            <button onClick={(() => {handleCount(popularCount-1)})} className='slider-previous'></button>
                            {gamesPopular.map((game, index) => {
                                return (
                                    <input key={`popular-${game.id}`} type='radio' name='radio-button' id={`btn-radio${index}`} onClick={(() => {setPopularCount(index)})} className='slider-button'/>
                                )
                            })}
                            <button onClick={(() => {handleCount(popularCount+1)})} className='slider-next'></button>
                        </span>
                    </>
                )}
                {/* Insert section Recently released */}
                {gamesRecent.length > 0 && (
                    <section className="recently-released">
                        <h2>Recently released</h2>
                        <ul className="recently-released-wrapper">
                            {gamesRecent.map((game) => {
                                return(
                                    <GameTile
                                        key={game.id}
                                        background_image={game.background_image}
                                        name={game.name}
                                        genres={game.genres[0].name}
                                        released={game.released}
                                    />
                                )
                            })}
                        </ul>
                    </section>
                )}
            </div>
        </>
    )
}

export default Home