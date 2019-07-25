import React from 'react'
import IndivGame from '../IndivGame/IndivGame'

function GameList(props) {
  const games = () => {
    return props.games.map((gameObj, index) => {
      return (
        <li key={index}>
          <IndivGame id={gameObj.id} cover={gameObj.cover} name={gameObj.name} criticRating={gameObj['aggregated_rating'] ? Math.round(parseFloat(gameObj['aggregated_rating'])) : 'N/A'} genres={gameObj.genres} platforms={gameObj.platforms} releaseDate={gameObj['first_release_date']} summary={gameObj.summary} similarGames={gameObj['similar_games']} />
        </li>
      )
    })
  }
  return (
    <div>
    {console.log(props.games)}
      <ul>
        {games()}
      </ul>
    </div>
  )
}

export default GameList
