import React, { Component } from 'react'
import RatingsAPI from '../../api/RatingsAPI'
import { ListGroup } from 'react-bootstrap'

class GameRatings extends Component {
  state = {
    ratings: []
  }

  componentDidMount() {
    RatingsAPI.fetchRatingsByGameId(this.props.ratingGameId, this.props.token)
      .then(response => response.json())
      .then(jsonResponse => this.setState({ratings: jsonResponse}))
  }

  ratingList() {
    return this.state.ratings.map((ratingObj, index) => {
      return (
        <ListGroup.Item key={index}>
          <h3>{ratingObj.rating} / 5</h3>
          <h4>{ratingObj.title}</h4>
          <p>{ratingObj.comment}</p>
          <p>rated on {ratingObj['published_date']} by {ratingObj.username}</p>
        </ListGroup.Item>
      )
    })
  }

  render() {
    return (
      <div>
        <h2>Ratings</h2>
        <ListGroup variant="flush">
          {this.ratingList()}
        </ListGroup>
      </div>
    )
  }
}

export default GameRatings
