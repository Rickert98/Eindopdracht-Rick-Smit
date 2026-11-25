import axios from 'axios';
import {useContext, useEffect, useState} from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';

import mockGames from '../../constants/mockGames.json'

import GameTile from '../../components/homepage_gametile/homepage_gametile.jsx';
import PopularGames from '../../components/homepage_populargames/homepage_populargames.jsx'
import AddButton from '../../components/addButton/AddButton.jsx';
import ErrorMessage from '../../components/errorMessage/ErrorMessage.jsx';

import './Home.css';

function Home () {
    const token = localStorage.getItem('token');
    const API_URL_NOVI = `https://novi-backend-api-wgsgz.ondigitalocean.app/api/userLibrary`;
    const API_URL_RAWG = 'https://api.rawg.io/api/games';
    const API_KEY_RAWG = import.meta.env.VITE_API_KEY;
    const { user } = useContext(AuthContext);

    /* Set States for storing game data */
    const [gamesPopular, setGamesPopular] = useState([]);
    const [popularCount, setPopularCount] = useState(0);
    const [gamesRecent, setGamesRecent] = useState([]);
    const [gamesRated, setGamesRated] = useState([]);

    const [userLibrary, setUserLibrary] = useState([]);

    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);

    /* =================================================================================================================
                        Upon refresh:
                                    Fetch games from RAWG
                                    Fetch userlibrary
    */
    useEffect (() => {
        toggleLoading(true);
        toggleError(false);
        const controller = new AbortController();

        /* Fetch games from RAWG API. SearchQuery can be updated */
        async function FetchGames (searchQuery, setState) {
            try {
                const response = await axios.get(API_URL_RAWG, {
                    params: {
                        key: API_KEY_RAWG,
                        ...searchQuery
                    },
                    signal: controller.signal,
                });

                /* If RAWG doesnt respond, switch to mockdata */
                if (response.status !== 200) {
                    throw new Error(`API error: ${response.status}`);
                }
                /* If no problem. Set state with the results */
                setState(response.data.results);
                console.log("Succesfully received data from RAWG");
            } catch (e){
                console.warn("RAWG api is not available, switching to mockdata");
                console.error(e);
                setState(mockGames.results);

            }
            return function cleanup() {
                controller.abort();
            }
        }

        /* Fetch userlibrary to check if some games are allready owned by user. */
        async function fetchUserLibrary() {
            if (user !== null) {
                try {
                    const library = await axios.get(API_URL_NOVI, {
                        params: {
                            userId: user.id
                        },
                        headers: {
                            'novi-education-project-id': import.meta.env.VITE_NOVI_API_KEY,
                            'Content-Type': 'application/json',
                            'accept': '*/*',
                        },
                        signal: controller.signal,
                    });
                    setUserLibrary(library.data);
                    console.log(`De userlibrary bestaat uit: `);
                    console.log(library.data)
                } catch(e) {
                    console.error(e);
                    toggleError(true);
                }
                return function cleanup() {
                    controller.abort();
                }
            }
        }

        /* ==========          ==================================================================          ========== */
        /* Call the fetch games function here. First parameter is used for SearchQuerries, second parameter for State */
        /* Fetch popular games */
        FetchGames ( {
            page_size: 6,
            ordering: '-added',
        }, setGamesPopular);

        /* Fetch recent games */
        FetchGames ( {
            page_size: 20,
            ordering: '-released',
            metacritic: '60, 100',
        }, setGamesRecent);

        /* Fetch */
        FetchGames ( {
            page_size: 20,
            ordering: '-rated',
        }, setGamesRated);

        console.log(gamesRated);

        /* Finally fetch user library and set loading to false */
        fetchUserLibrary();
        toggleLoading(false);
    }, []);


    /* =================================================================================================================
                        Handles the count for the slider under popular games
    */
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
    /* ============================================================================================================== */

    return (
        <>
            <div className='inner-content-container'>
                {/* Insert section Popular games */}
                {gamesPopular.length > 0 && (
                    <>
                        <PopularGames
                            key={gamesPopular[popularCount].id}
                            id={gamesPopular[popularCount].id}
                            background_image={gamesPopular[popularCount].background_image}
                            name={gamesPopular[popularCount].name}
                            genre={gamesPopular[popularCount].genres[0].name}
                            rating={gamesPopular[popularCount].rating}
                            owned={gamesPopular[popularCount].added_by_status.owned}
                            playing={gamesPopular[popularCount].added_by_status.playing}
                            screenshot_one={gamesPopular[popularCount].short_screenshots[1].image}
                            screenshot_two={gamesPopular[popularCount].short_screenshots[2].image}
                        >
                            <AddButton
                                label={false}
                                gameDetails={gamesPopular[popularCount]}
                                library={userLibrary}
                            />
                        </PopularGames>

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
                        <h2 className='section-header'>Recently released</h2>
                        <ul className="List-games-wrapper">
                            {gamesRecent.map((game) => {
                                return(
                                    <GameTile
                                        key={game.id}
                                        background_image={game.background_image}
                                        name={game.name}
                                        genres={game.genres[0].name}
                                        released={game.released}
                                        id={game.id}
                                    >
                                        <AddButton
                                            label={false}
                                            gameDetails={game}
                                            library={userLibrary}
                                        />
                                    </GameTile>

                                )
                            })}
                        </ul>
                    </section>
                )}
                {gamesRated.length > 0 && (
                    <section className="recently-released">
                        <h2 className='section-header'>Top rated</h2>
                        <ul className="List-games-wrapper">
                            {gamesRated.map((game) => {
                                return(
                                    <GameTile
                                        key={game.id}
                                        background_image={game.background_image}
                                        name={game.name}
                                        genres={game.genres[0].name}
                                        released={game.released}
                                        id={game.id}
                                    >
                                        <AddButton
                                            label={false}
                                            gameDetails={game}
                                            library={userLibrary}
                                        />
                                    </GameTile>

                                )
                            })}
                        </ul>
                    </section>
                )}

                {loading === true && <p>Loading...</p> }
                {error === true && <ErrorMessage message="Something went wrong with fetching the data. Try again later."/>}
            </div>
        </>
    )
}

export default Home