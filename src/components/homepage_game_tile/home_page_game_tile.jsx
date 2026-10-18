function gameTile (game) {
    return (
        <article>
            <span>
                <img src={game.background_image} alt='game image'/>
            </span>
            <h3>{game.name}</h3>
            <div>
                <p>{game.genres[0].name}</p>
                <p>{game.released}</p>
            </div>

        </article>
    )
}

export default gameTile