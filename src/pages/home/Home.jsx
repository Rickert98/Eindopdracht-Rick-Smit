import axios from 'axios';
import {useEffect, useState} from 'react';

import GameTile from '../../components/homepage_gametile/homepage_gametile.jsx';
import PopularGames from '../../components/homepage_populargames/homepage_populargames.jsx'

import './Home.css';

function Home () {
    /* Set States for storing game data */
    const [gamesPopular, setGamesPopular] = useState([]);
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
                        page_size: 40,
                        ordering: '-added',
                    },
                })
                setGamesPopular (result.data.results)
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

    return (
        <>
            <div className='inner-content-container'>
                {/* Buttons for quick testing. Replace later with mounting cycle */}
                {/*<button type='button' onClick={() => fetchGames()}>Fetch All Games</button>*/}
                <button type='button' onClick={() => console.log(gamesPopular)}>Games</button>

                {/* Insert section Popular games */}
                {gamesPopular.length > 0 && (
                    <PopularGames
                        key={gamesPopular[0].id}
                        background_image={gamesPopular[0].background_image}
                        name={gamesPopular[0].name}
                        genre={gamesPopular[0].genres[0].name}
                        rating={gamesPopular[0].rating}
                        owned={gamesPopular[0].added_by_status.owned}
                        playing={gamesPopular[0].added_by_status.playing}
                        screenshot_one={gamesPopular[0].short_screenshots[1].image}
                        screenshot_two={gamesPopular[0].short_screenshots[2].image}
                    />
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