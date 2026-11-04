import {useContext, useEffect, useState} from 'react'

/*import fetchUserLibrary from '../../helpers/fetchUserLibrary';*/
import {AuthContext} from "../../context/AuthContext.jsx";

import GameTile from '../../components/libraryGame/LibraryGame.jsx'
/*
import Filter from '../../components/libraryFilter/libraryFilter.jsx'
*/

import styles from './Library.module.css'
import axios from "axios";

function Library () {
    const [userLibrary, setUserLibrary] = useState([]);
    const [genres, setGenres] = useState([]);
    const [filter, setFilter] = useState('');

    /*const [loading, toggleLoading] = useState(false);*/

    const { user } = useContext(AuthContext);

    useEffect(()=>{
        async function fetchLibrary() {
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

                /* Set array containing all genres of games the user have */
                function onlyUnique(value, index, array){
                    return array.indexOf(value) === index;
                }

                /* Make sure every entry is one genre. First entry should be All games*/

                const allGenres = library.data.map((gameGenres)=>{return gameGenres.genre.split(', ')});
                allGenres.splice(0,0,"All games");
                setGenres(allGenres.flat().filter(onlyUnique));

            } catch(e) {
                console.error(e);
            }
        }
        fetchLibrary()
        console.log(userLibrary);

    },[]);

    useEffect(() => {
        console.log("Updated userLibrary state:", userLibrary);
        /* Set the initial filter to the first entry in the genres state */
        setFilter(genres[0]);
    }, [userLibrary]);

    useEffect(()=>{
        console.log(genres)
    },[genres]);

    return (
        <>
            <section className={styles['library-outer-container']}>
                <h1 className={styles['page-title']}>Your library</h1>
                {userLibrary &&
                    <div className={styles['library-inner-container']}>
                        <aside className={styles['filter-container']}>
                            {
                                genres.map((genre, index)=> {
                                    return (
                                        <label key={`filter-${genre}`} className={styles['filter-button']}>
                                            {genre}
                                            <input
                                                type="radio"
                                                name="library-filter"
                                                id={`library-filter-${index}`}
                                                onChange={(()=>{setFilter(genre)})}
                                                checked={filter===genre}
                                                className={styles['radio-button']}
                                            />
                                        </label>
                                    )
                                })
                            }
                        </aside>
                        <ul className={styles['library']}>
                            {
                                userLibrary.map((games) => {
                                    return (
                                        <GameTile
                                            game={games}
                                            filters={filter}
                                            key={`game-${games.gameId}`}
                                        />
                                    )
                                })
                            }
                        </ul>
                    </div>
                }
            </section>
        </>
    )
}

export default Library