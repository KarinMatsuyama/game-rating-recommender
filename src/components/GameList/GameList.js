import React from 'react'
import { Container, Row, Carousel } from "react-bootstrap";
import IndivGame from '../IndivGame/IndivGame'
import './GameList.css'

function GameList(props) {
  const games = () => {
    return props.games.map((gameObj, index) => {
      return (
          <IndivGame key={index} id={gameObj.id} cover={gameObj.cover} name={gameObj.name} criticRating={gameObj['aggregated_rating'] ? Math.round(parseFloat(gameObj['aggregated_rating'])) : 'N/A'} genres={gameObj.genres} platforms={gameObj.platforms} releaseDate={gameObj['first_release_date']} summary={gameObj.summary} similarGames={gameObj['similar_games']} />
      )
    })
  }
  return (
    <div>
    {console.log(props.games)}
      <Container fluid={true}>
        <Carousel interval={null} indicators={false} className="carousel">
          <Carousel.Item className="pl-5 pr-5">
            <Row>
            {games().slice(0,5)}
            </Row>
          </Carousel.Item>          
          <Carousel.Item className="pl-5 pr-5">
            <Row>
            {games().slice(5)}
            </Row>
          </Carousel.Item>
        </Carousel>
      </Container>
    </div>
  )
}

export default GameList
