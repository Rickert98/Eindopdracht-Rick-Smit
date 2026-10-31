/* Deletes a game from the user library in the NOVI api */


import axios from "axios";

async function deleteUserLibrary(userId, gameId, token, setDeleteGameLibrary) {
    try {
        /* First find the entry key of this specific game in the userslibrary */
        const gameIdLibrary = await axios.get(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/userLibrary`, {
            params: {
                "userId": userId,
                "gameId": gameId,
            },
            headers: {
                'novi-education-project-id': import.meta.env.VITE_NOVI_API_KEY,
                'Content-Type': 'application/json',
                'accept': '*/*',
            }
        });
        console.log(gameIdLibrary);
        /* use the entry key to find the specific game and delete it. */
        if (gameIdLibrary) {
            const deleteGame = await axios.delete(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/userLibrary/${gameIdLibrary.data[0].id}`,{
                headers: {
                    'novi-education-project-id': import.meta.env.VITE_NOVI_API_KEY,
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'accept': '*/*',
                }
            });
            console.log("Game is succesfully deleted from the user library ")
            console.log(deleteGame);
            /* Set the state back to zero */
            setDeleteGameLibrary(0);
        }
    } catch(e) {
        console.error(e);
    }
}

export default deleteUserLibrary
