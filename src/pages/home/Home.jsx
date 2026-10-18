import axios from 'axios';
import {useEffect, useState} from 'react';

import gameTile from '../../components/homepage_game_tile/home_page_game_tile.jsx'



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
            <main>
                {/* Buttons for quick testing. Replace later with mounting cycle */}
                {/*<button type='button' onClick={() => fetchGames()}>Fetch All Games</button>*/}
                <button type='button' onClick={() => console.log(gamesPopular)}>Games</button>


                <section className="popular_games">
                    {gamesPopular.length > 0 && (
                        <div>
                            <h1>Popular</h1>
                            <p>{gamesPopular[0].name}</p>
                        </div>

                    )}
                </section>

                {gamesRecent.length > 0 && (
                    <div>
                        <h2>Recently released</h2>
                        {gamesRecent.map((game) => {
                            return(
                                gameTile(game)
                            )
                        })}
                    </div>
                )}

            </main>
        </>
    )
}

export default Home