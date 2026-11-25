import axios from 'axios';
import {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import parse from 'html-react-parser';

import mockGamesDetail from '../../constants/mockGamesDetail.json'

import Specs from '../../components/detailPageSpecs/detailPageSpecs.jsx';
import SpecLister from '../../helpers/SpecLister.js';
import UserReviewScore from '../../helpers/UserReviewScore.js';
import AddButton from '../../components/addButton/AddButton.jsx';

import styles from './Game_detail.module.css';
import {AuthContext} from "../../context/AuthContext.jsx";

function GameDetail () {
    const [gameDetails, setGameDetails] = useState();
    const [gameScreenshots, setGameScreenshots] = useState([]);
    const [userLibrary, setUserLibrary] = useState([]);

    /* State for posting a game to the users library in NOV api */
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);
    const {id} = useParams();

    const { user } = useContext(AuthContext);

    /* Fetch game data upon refresh */
    useEffect(() => {
        const controller = new AbortController();
        toggleLoading(true);

        async function fetchGame(targetId) {
            toggleError(false);

            try {
                const result = await axios.get(`https://api.rawg.io/api/games/${targetId}`,{
                    params: {
                        key: import.meta.env.VITE_API_KEY,
                    },
                    signal: controller.signal,
                });

                /* Throw error when RAWG api isn't working. */
                if(result.status !== 200) {
                    throw new Error(`API error: ${result.status}`)
                }
                setGameDetails(result.data);
                console.log(result.data);
            } catch(e) {
                if (axios.isCancel(e)) {
                    console.error('Request is canceled');
                } else {
                    console.warn(
                        "RAWG API not available, switching to mockdata"
                    )
                    console.log('mockgamesdetails');
                    console.log(mockGamesDetail[targetId])
                    console.error(e);
                    toggleError(true);
                    await setGameDetails(mockGamesDetail[targetId]);
                }
            } finally {
                toggleLoading(false);
            }
        }

        async function fetchScreenshots(targetId) {
            toggleError(false);

            try {
                const result = await axios.get(`https://api.rawg.io/api/games/${targetId}/screenshots`,{
                    params: {
                        key: import.meta.env.VITE_API_KEY,
                    },
                    signal: controller.signal,
                });

                /* Throw error when RAWG api isn't working. */
                if(result.status !== 200) {
                    throw new Error(`API error: ${result.status}`)
                }
                setGameScreenshots(result.data.results);
                console.log(result);
            } catch(e) {
                if (axios.isCancel(e)) {
                    console.error('Request is canceled');
                } else {
                    console.warn(
                        "RAWG API not available, switching to mockdata"
                    )
                    console.log('mockgamesscreenshots');
                    console.log(mockGamesDetail[targetId]?.screenshots);
                    console.error(e);
                    toggleError(true);
                    await setGameScreenshots(mockGamesDetail[targetId]?.screenshots);
                }
            } finally {
                toggleLoading(false);
            }
        }

        async function fetchUserLibrary () {
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
                    setUserLibrary(library.data);
                    console.log(`De userlibrary bestaat uit: `);
                    console.log(library.data)
                } catch(e) {
                    console.error(e);
                }
            }
        }

        fetchGame(id);
        fetchScreenshots(id);
        fetchUserLibrary ();

        return function cleanup() {
            controller.abort();
        }
    }, [])

    return (
        <>
            {gameDetails !== undefined && gameScreenshots  &&
                <div className='inner-content-container detail_page'>
                    <header className={styles["header"]}>
                        <img className={styles['header_background']} src={gameDetails.background_image} alt='background image'/>
                        <h1>{gameDetails.name}</h1>
                        <article className={styles['header_content_wrapper']}>
                            {gameDetails.ratings &&
                                <div className={styles['header-ratings']}>
                                    <a href={gameDetails.metacritic_url} target="_blank">Metacritic rates this {gameDetails.metacritic}</a>
                                    <p>The players rates this {UserReviewScore(gameDetails.ratings)}</p>
                                </div>
                            }
                            <AddButton
                                label={true}
                                gameDetails={gameDetails}
                                library={userLibrary}
                            />
                            {
                                gameDetails.publishers &&
                                <div className={styles["header-publisher"]}>Published by {gameDetails.publishers[0].name}</div>
                            }
                        </article>
                    </header>
                    <section className={styles['maincontent']}>
                        {gameDetails &&
                            <>
                                <div className={styles['details_wrapper']}>
                                    <Specs
                                        title="About"
                                        contents={parse(gameDetails.description || '')}
                                    />
                                    <div className={styles['details-div']}>
                                        <article className={styles['details-article']}>

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
                                        <article className={styles['details-article']}>
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
                                    </div>
                                </div>
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

                    </section>
                </div>
            }
            {loading === true && <p>Loading...</p>}
            {error && <p>Er ging iets mis met het ophalen van de data...</p>}
        </>
    )
}

export default GameDetail;