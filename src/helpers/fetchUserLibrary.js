import axios from 'axios';

async function fetchUserLibrary(user, setUserLibrary) {
    if (user !== null) {
        try {
            const library = await axios.get(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/userLibrary`, {
                params: {
                    userId: user
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

export default fetchUserLibrary