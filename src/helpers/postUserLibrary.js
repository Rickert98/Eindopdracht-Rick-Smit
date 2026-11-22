import axios from 'axios';

async function postUserLibrary(userId, game, token, setAddGameLibrary) {
    console.log("trying to post the game in the novi library ")
    console.log(game)
    console.log(userId);
    console.log(game.gameId);
    console.log(game.title);
    console.log(game.genres);
    console.log(game.background_image);
    console.log(game.platforms);
    try {
        const response = await axios.post(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/userLibrary/`,{
            "userId": userId,
            "gameId": game.gameId,
            "title": game.title,
            "genre": game.genres,
            "background": game.background,
            "platforms": game.platforms

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