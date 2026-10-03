import axios from 'axios';

const api_key = '35ad69804a1549088a32b833826e09f4'


function App() {
    async function fetchGames () {
        try {
            const result = await axios.get('https://api.rawg.io/api/games', {
                params: {
                    key: api_key,

                }
            })
            console.log(result);
        } catch (e){
            console.error(e);
        }
    }

    return (
        <>
            <main>
                <h1>Hello world!</h1>
                <button type='button' onClick={() => fetchGames()}>Fetch All Games</button>
            </main>
        </>
    )
}

export default App