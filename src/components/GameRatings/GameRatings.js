import React, { Component } from 'react'
import RatingsAPI from '../../api/RatingsAPI'
import { ListGroup } from 'react-bootstrap'
import './GameRatings.css'

class GameRatings extends Component {
  state = {
    ratings: []
  }

  componentDidMount() {
    RatingsAPI.fetchRatingsByGameId(this.props.ratingGameId)
      .then(response => response.json())
      .then(jsonResponse => this.setState({ratings: jsonResponse}))
  }

  ratingList() {
    return this.state.ratings.map((ratingObj, index) => {
      return (
        <ListGroup.Item className="text-left" key={index}>
          <h3>{ratingObj.rating} / 5</h3>
          <h4>{ratingObj.title}</h4>
          <h5>{ratingObj.comment}</h5>
          <p className="mb-1">Rated on {ratingObj['published_date'].split('T')[0]} by {ratingObj.username}</p>
        </ListGroup.Item>
      )
    })
  }

  render() {
    return (
      <div className="pb-5">
        <h2 className="ratings-title py-3">RATINGS</h2>
        <ListGroup className='rating-list' variant="flush">
          {this.ratingList()}
        </ListGroup>
      </div>
    )
  }
}

export default GameRatings
