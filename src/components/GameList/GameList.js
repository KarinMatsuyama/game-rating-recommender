import React, { Component } from 'react'
import { Container, Row, Carousel, Col } from "react-bootstrap";
import IndivGame from '../IndivGame/IndivGame'
import './GameList.css'
import IgdbAPI from '../../api/IgdbAPI'

class GameList extends Component {
  state = {
    coverUrls: []
  }

  componentDidMount = () => {
    let coverIds = this.props.games.map((gameObj) => {
        return gameObj.cover
    })
    let filteredIds = coverIds.filter(id => id != null)
    IgdbAPI.fetchCover(filteredIds)
      .then(jsonResponse => this.setState({coverUrls: jsonResponse}))
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.games !== this.props.games) {
      let coverIds = this.props.games.map((gameObj) => {
        return gameObj.cover
      })
      let filteredIds = coverIds.filter(id => id != null)
      IgdbAPI.fetchCover(filteredIds)
        .then(jsonResponse => this.setState({coverUrls: jsonResponse}))
    }
  }

  games() {
    return this.props.games.map((gameObj, index) => {
      let cover = ''
      for (let i = 0; i < this.state.coverUrls.length; i++) {
        if (this.state.coverUrls[i]['game'] === gameObj.id) {
          let coverUrl = this.state.coverUrls[i]['url'].split('/')
          cover = `${coverUrl[coverUrl.length - 1]}`
        } 
      }
      return (
          <IndivGame key={index} id={gameObj.id} cover={cover ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover}` : 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/No_image_available_450_x_600.svg/450px-No_image_available_450_x_600.svg.png'} name={gameObj.name} criticRating={gameObj['aggregated_rating'] ? Math.round(parseFloat(gameObj['aggregated_rating'])) : 'N/A'} />
      )
    })
  }

  render() {
    return (
      <div>
      {this.state.coverUrls.length > 0 && 
        <Container fluid={true}>
          <Carousel interval={null} indicators={false} className="carousel">
            <Carousel.Item className="pl-5 pr-5">
              <Row>
              {this.props.games.length >= 5 ? 
                this.games().slice(0,5) : 
                this.games().concat(Array(5 - this.props.games.length).fill(<Col></Col>))
              }
              </Row>
            </Carousel.Item>          
            <Carousel.Item className="pl-5 pr-5">
              <Row>
              {this.props.games.length < 10 ? 
                this.games().slice(5).concat(Array(10 - this.props.games.length).fill(<Col></Col>)) : 
                this.games().slice(5)
              }
              </Row>
            </Carousel.Item>
          </Carousel>
        </Container>
      }
      </div>
    )
  }
}

export default GameList
