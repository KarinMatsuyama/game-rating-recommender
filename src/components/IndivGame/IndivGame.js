import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Col, Card } from 'react-bootstrap'
import IgdbAPI from '../../api/IgdbAPI'
import './IndivGame.css'

class IndivGame extends Component {
  render() {
    const {id, name, criticRating, cover} = this.props
    return (
      <Col className="px-1 py-4">
        <Card className="card-element">
          <Link to={`/game/${id}`}><img className="cover-img" src={cover} alt="cover image"/></Link>
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
