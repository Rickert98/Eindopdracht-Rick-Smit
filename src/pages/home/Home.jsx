import axios from 'axios';
import {useContext, useEffect, useState} from 'react';

import GameTile from '../../components/homepage_gametile/homepage_gametile.jsx';
import PopularGames from '../../components/homepage_populargames/homepage_populargames.jsx'

import { AuthContext } from '../../context/AuthContext.jsx';


import './Home.css';

function Home () {

    /* get the user ID and email from the context */
    const { user } = useContext(AuthContext);

    /* Set States for storing game data */
    const [gamesPopular, setGamesPopular] = useState([]);
    const [popularCount, setPopularCount] = useState(0);
    const [gamesRecent, setGamesRecent] = useState([]);
    const [userLibrary, setUserLibrary] = useState([]);
    const [addGameLibrary, setAddGameLibrary] = useState(0); /* State for posting a game to the users library in NOV api */

    /* ============================================================================= Set States for possible errors */

    const token = localStorage.getItem('token');


    async function putUserLibrary(gameId) {
        console.log(token)
        const { user } = useContext(AuthContext);

        try {
            const response = await axios.post(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/userLibrary/`,{
                "userId": user.id,
                "gameId": gameId,
            }, {
                headers: {
                    'novi-education-project-id': import.meta.env.VITE_NOVI_API_KEY,
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'accept': '*/*',
                }
            });
            console.log("library succesvol gepost")
            console.log(response);
        } catch(e) {
            console.error(e);
        }
    }
/* FIX THIS LATER WHEN RAWG WORKS OR IF IT DOESNT WORK SWTICH TO SOMETHING ELSE */
    const apiRAWG = 'https://api.rawg.io/api/games';
    const apiPhalco = 'https://rawg2steam.phalco.de/api/games?search=query';

    useEffect (() => {
        /* Upon refresh fetch games from RAWG api and fetch userLibrary */
        async function fetchGames () {
            console.log(user);

            try {
                /* Fetch popular games from RAWG */
                const popularGames = await axios.get(apiRAWG, {
                    params: {
                        key: import.meta.env.VITE_API_KEY,
                        page_size: 6,
                        ordering: '-added',
                    },
                });
                setGamesPopular (popularGames.data.results)
                console.log(popularGames);

                /* Fetch recent games from RAWG */
                const recentGames = await axios.get(apiRAWG, {
                    params: {
                        key: import.meta.env.VITE_API_KEY,
                        page_size: 20,
                        ordering: '-released',
                        metacritic: '40, 100',
                    },
                });
                setGamesRecent (recentGames.data.results)
                console.log(recentGames);
            } catch (e){
                console.error(e);
            }
        }
        fetchGames();

        fetchUserLibrary();
    }, []);


    async function fetchUserLibrary() {
        if (user !== null) {
            try {
                const library = await axios.get(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/userLibrary`, {
                    params: {
                        userId: user.id
                    },
                    headers: {
                        'novi-education-project-id': import.meta.env.VITE_NOVI_API_KEY,
                        'Content-Type': 'application/json',
                        'accept': '*/*',
                    }
                });
                setUserLibrary(library);
                console.log(`De userlibrary bestaat uit: `);
                console.log(library)
            } catch(e) {
                console.error(e);
            }
        }
    }

    function handleCount (number) {
        /* State popularCount cant be higher than the number of popular games in stored in the state gamesPopular.
        * Cant be lower than 0 */
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

                        {/* Slider for the popular games */}
                        <span className="popular-slider">
                            <button onClick={(() => {handleCount(popularCount-1)})} className='slider-previous'></button>
                            {gamesPopular.map((game, index) => {
                                return (
                                    <input
                                        key={`popular-${game.id}`}
                                        type='radio'
                                        name='radio-button'
                                        id={`btn-radio${index}`}
                                        checked={popularCount === index}
                                        onChange={(() => {setPopularCount(index)})}
                                        className='slider-button'/>
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
                                        id={game.id}
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