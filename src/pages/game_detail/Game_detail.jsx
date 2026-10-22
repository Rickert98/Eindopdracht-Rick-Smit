import axios from 'axios';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import Specs from '../../components/detailPageSpecs/detailPageSpecs.jsx'
import SpecLister from '../../helpers/SpecLister.js'


function GameDetail () {
    /*const [error, toggleError] = useState(false);*/
    const [gameDetails, setGameDetails] = useState({});
    const {id} = useParams();


    useEffect (() => {
        /*toggleError(false);*/

        async function fetchGame(id) {
            try {
                const result = await axios.get(`https://api.rawg.io/api/games/${id}`,{
                    params: {
                        key: import.meta.env.VITE_API_KEY,
                    },
                });
                setGameDetails(result.data);
                console.log(result.data);
            } catch(e) {
                console.error(e)

            }
        }
        fetchGame(id);
    },[])






    return (
        <>
            <header>
                <img src={gameDetails.background_image} alt='background image'/>
                <h1>{gameDetails.name}</h1>
            </header>
            <section>
                <section>
                    <Specs
                        title="About"
                        contents={gameDetails.description}
                    />
                    <div>
                        <article>
                            {/* Platform data is in another array. Map methode is used here to create an array that works with SpecLister */}
                            <Specs
                                title="Platforms"
                                contents={SpecLister(gameDetails.platforms.map((result)=>{
                                    return (
                                        result.platform
                                    )
                                }))}
                            />
                            <Specs
                                title="Release date"
                                contents={gameDetails.released}
                            />
                            <Specs
                                title="Tags"
                                contents={SpecLister(gameDetails.tags)}
                            />
                        </article>
                        <article>
                            <Specs
                                title="Genre"
                                contents={SpecLister(gameDetails.genres)}
                                />
                            <Specs
                                title="Age rating"
                                contents={gameDetails.esrb_rating.name}
                                />
                        </article>




                    </div>
                </section>
            </section>
        </>

    )





}

export default GameDetail;