import React from 'react'
import { Container, Row, Carousel, Col } from "react-bootstrap";
import IndivGame from '../IndivGame/IndivGame'
import './GameList.css'

function GameList(props) {
  const games = () => {
    return props.games.map((gameObj, index) => {
      return (
          <IndivGame key={index} id={gameObj.id} cover={gameObj.cover} name={gameObj.name} criticRating={gameObj['aggregated_rating'] ? Math.round(parseFloat(gameObj['aggregated_rating'])) : 'N/A'} />
      )
    })
  }
  return (
    <div>
      <Container fluid={true}>
        <Carousel interval={null} indicators={false} className="carousel">
          <Carousel.Item className="pl-5 pr-5">
            <Row>
            {props.games.length >= 5 ? 
              games().slice(0,5) : 
              games().concat(Array(5 - props.games.length).fill(<Col></Col>))
            }
            </Row>
          </Carousel.Item>          
          <Carousel.Item className="pl-5 pr-5">
            <Row>
            {props.games.length < 10 ? 
              games().slice(5).concat(Array(10 - props.games.length).fill(<Col></Col>)) : 
              games().slice(5)
            }
            </Row>
          </Carousel.Item>
        </Carousel>
      </Container>
    </div>
  )
}

export default GameList
