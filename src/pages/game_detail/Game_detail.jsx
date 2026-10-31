import axios from 'axios';
import {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import Specs from '../../components/detailPageSpecs/detailPageSpecs.jsx';
import SpecLister from '../../helpers/SpecLister.js';
import AddButton from '../../components/addButton/AddButton.jsx';

import fetchUserLibrary from '../../helpers/fetchUserLibrary.js';
import deleteGameFromUserLibrary from '../../helpers/deleteUserLibrary.js';
import postUserLibrary from '../../helpers/postUserLibrary.js';

import styles from './Game_detail.module.css';
import {AuthContext} from "../../context/AuthContext.jsx";

function GameDetail () {
    const [gameDetails, setGameDetails] = useState([]);
    const [gameScreenshots, setGameScreenshots] = useState([]);
    const [userLibrary, setUserLibrary] = useState([]);
    const [addGameLibrary, setAddGameLibrary] = useState(0); /* State for posting a game to the users library in NOV api */
    const [deleteGameLibrary, setDeleteGameLibrary] = useState(0); /* State for posting a game to the users library in NOV api */

    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const {id} = useParams();
    const token = localStorage.getItem('token');
    const { user } = useContext(AuthContext);

    /* Fetch game data upon refresh */
    useEffect(() => {
        const controller = new AbortController();

        async function fetchGame(id) {
            toggleLoading(true);
            toggleError(false);

            try {
                const result = await axios.get(`https://api.rawg.io/api/games/${id}`,{
                    params: {
                        key: import.meta.env.VITE_API_KEY,
                    },
                    signal: controller.signal,
                });
                setGameDetails(result.data);
                console.log(result.data);
                /* Also fetch userLibrary so we know if the game is allready owned by the user */
                await fetchUserLibrary(user.id, setUserLibrary);
            } catch(e) {
                if (axios.isCancel(e)) {
                    console.error('Request is canceled');
                } else {
                    console.error(e);
                    toggleError(true);
                }
            } finally {
                toggleLoading(false);
            }
        }

        async function fetchScreenshots(id) {
            toggleLoading(true);
            toggleError(false);

            try {
                const result = await axios.get(`https://api.rawg.io/api/games/${id}/screenshots`,{
                    params: {
                        key: import.meta.env.VITE_API_KEY,
                    },
                    signal: controller.signal,
                });
                setGameScreenshots(result.data.results);
                console.log(result);
            } catch(e) {
                if (axios.isCancel(e)) {
                    console.error('Request is canceled');
                } else {
                    console.error(e);
                    toggleError(true);
                }
            } finally {
                toggleLoading(false);
            }
        }

        fetchGame(id);
        fetchScreenshots(id);

        console.log(gameScreenshots);

        return function cleanup() {
            controller.abort();
        }
    }, [])

    /* When user clicks on the button 'add to library'. This function will post the new game to the library */
    useEffect (() => {
        console.log("going to add game")
        async function addGameToLibrary() {
            await postUserLibrary(user.id, addGameLibrary, token, setAddGameLibrary)
        }
        /* Add a check so it doesnt post anything the first time the page renders */
        if (addGameLibrary !== 0) {
            addGameToLibrary()
        } else {
            console.log("No game added");
        }
    },[addGameLibrary])

    /* When user clicks on the button 'delete from library'. This function will delete the  game from the library */
    useEffect (() => {
        async function deleteUserLibrary() {
            try {
                await deleteGameFromUserLibrary(user.id, deleteGameLibrary, token, setDeleteGameLibrary)
            } catch(e) {
                console.error(e);
            }
        }
        /* Add a check so it doesnt try to delete anything when there is no  game set in the state */
        if (deleteGameLibrary !== 0) {
            deleteUserLibrary()
        } else {
            console.log("No game deleted");
        }
    },[deleteGameLibrary])

    return (
        <div className='inner-content-container detail_page'>
            <header className="detail_header">
                <img className={styles['header_background']} src={gameDetails.background_image} alt='background image'/>
                <h1>{gameDetails.name}</h1>
            </header>
            <section className={styles['details_screenshots_wrapper']}>
                {gameDetails &&
                    <>
                        <section>
                            <Specs
                                title="About"
                                contents={gameDetails.description}
                            />
                            <div>
                                <article className={styles['details_wrapper']}>

                                        {gameDetails.platforms &&
                                            <Specs className={styles['detail']}
                                                   title="Platforms"
                                                   contents={SpecLister(gameDetails.platforms.map((result)=>{
                                                       return (
                                                           result.platform
                                                       )
                                                   }))}
                                            />
                                        }
                                        <Specs className={styles['detail']}
                                               title="Release date"
                                               contents={gameDetails.released}
                                        />
                                    <Specs
                                        title="Tags"
                                        contents={SpecLister(gameDetails.tags)}
                                    />

                                    {/* Platform data is in another array. Map methode is used here to create an array that works with SpecLister*/}

                                </article>
                                <article>
                                    <Specs className={styles['detail']}
                                        title="Genre"
                                        contents={SpecLister(gameDetails.genres)}
                                    />
                                    {
                                        gameDetails.esrb_rating &&
                                        <Specs className={styles['detail']}
                                            title="Age rating"
                                            contents={gameDetails.esrb_rating.name}
                                        />
                                    }
                                </article>

                                    <AddButton
                                        idGame={gameDetails.id}
                                        library={userLibrary}
                                        addGame={setAddGameLibrary}
                                        deleteGame={setDeleteGameLibrary}
                                    />


                            </div>
                        </section>
                        {gameScreenshots &&
                            <section className={styles['screenshots']}>
                                {/* Get a maximum of 4 screenshots shown on the */}
                                {gameScreenshots.map((screenshot, index) => {
                                    if (index < 4) {
                                        return (
                                            <img key={screenshot.id} src={screenshot.image} alt="screenshot" className={styles['screenshot']}/>
                                        )
                                    }
                                })}
                            </section>
                        }
                    </>
                }
                {loading && <p>Loading...</p>}
                {error && <p>Er ging iets mis met het ophalen van de data...</p>}
            </section>
        </div>
    )
}

export default GameDetail;