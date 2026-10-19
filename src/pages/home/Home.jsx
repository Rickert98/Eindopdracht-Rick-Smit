import axios from 'axios';
import {useEffect, useState} from 'react';

import GameTile from '../../components/homepage_gametile/homepage_gametile.jsx';

import './Home.css';

function Home () {
    /* Set States for storing game data */
    const [gamesPopular, setGamesPopular] = useState([]);
    const [gamesRecent, setGamesRecent] = useState([]);
    /* Set States for possible errors */


    /* Upon refresh fetch games from RAWG api */
    /* maximum page size is 40 */
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
                <section className="popular_games">
                    {gamesPopular.length > 0 && (
                        <div>
                            <h1>Popular</h1>
                            <p>{gamesPopular[0].name}</p>
                        </div>

                    )}
                </section>

                {/* Insert section Recently released */}
                {gamesRecent.length > 0 && (
                    <section className="recently-released-wrapper">
                        <h2>Recently released</h2>
                        <ul className="recently-released">
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