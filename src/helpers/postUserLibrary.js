import axios from 'axios';

async function postUserLibrary(userId, game, token, setAddGameLibrary) {
    console.log("trying to post the game in the novi library ")
    try {
        const response = await axios.post(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/userLibrary/`,{
            "userId": userId,
            "gameId": game.gameId,
            "title": game.title,
            "genre": `${game.genres}`

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
        /* Set the state back to zero */
        setAddGameLibrary({
            ...game,
            gameId: 0,
            title: '',
            genres: ''
        });
    } catch(e) {
        console.error(e);
    }
}

export default postUserLibrary