import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Col, Card } from 'react-bootstrap'
import IgdbAPI from '../../api/IgdbAPI'
import './IndivGame.css'

class IndivGame extends Component {
  state = {
    imageUrl: ''
  }

  componentDidMount = () => {
    let image = []
    if (this.props.cover) {
      IgdbAPI.fetchCover(this.props.cover)    
        .then(jsonResponse => image = jsonResponse[0].url.split('/'))
        .then(_response => this.setState({imageUrl: `https://images.igdb.com/igdb/image/upload/t_cover_big/${image[image.length - 1]}`}))
    } else {
      this.setState({imageUrl: null})
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.id !== prevProps.id) {
      let image = []
      if (this.props.cover) {
        IgdbAPI.fetchCover(this.props.cover)    
          .then(jsonResponse => image = jsonResponse[0].url.split('/'))
          .then(_response => this.setState({imageUrl: `https://images.igdb.com/igdb/image/upload/t_cover_big/${image[image.length - 1]}`}))
      } else {
        this.setState({imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/No_image_available_450_x_600.svg/450px-No_image_available_450_x_600.svg.png'})
      }
    }
  }

  render() {
    const {id, name, criticRating} = this.props
    return (
      <Col className="px-1 py-4">
        <Card className="card-element">
          <Link to={`/games/${id}`}><img className="cover-img" src={this.state.imageUrl} alt="cover image"/></Link>
          <Card.Body className="pl-3 pr-1 py-2 text-left card-body">
          <Card.Title className="title mr-0">{name}</Card.Title>
          <Card.Text>Critic Score: {criticRating}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    )
  }
}

export default IndivGame
