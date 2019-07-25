import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UsersAPI from '../api/UsersAPI'
import RatingsAPI from '../api/RatingsAPI'
import { ListGroup } from 'react-bootstrap'

class CurrentUserRatingsPage extends Component {
  state = {
    currentUserRatings: [],
    ratingGamePairs: []
  }

  componentDidMount() {
    UsersAPI.getCurrentUser(this.props.token)
      .then(jsonResponse => RatingsAPI.fetchRatingsForCurrentUser(jsonResponse.id, this.props.token))
      .then(response => response.json())
      .then(jsonResponse => this.setState({currentUserRatings: jsonResponse}))
      .then(_res => {
        for (let i = 0; i < this.state.currentUserRatings.length; i++) {
          let gameObj = {}
          RatingsAPI.fetchGameById(this.state.currentUserRatings[i].game, this.props.token)
            .then(jsonResponse => gameObj = jsonResponse)
            .then(_res => {
              this.setState({
                ratingGamePairs: [...this.state.ratingGamePairs, {
                  rating: this.state.currentUserRatings[i].rating,
                  commentTitle: this.state.currentUserRatings[i].title,
                  comment: this.state.currentUserRatings[i].comment,
                  publishedDate: this.state.currentUserRatings[i]['published_date'],
                  game: gameObj
                }]
              })
            })
        }
      })
  }

  ratingList() {
    return this.state.ratingGamePairs.map((ratingGame, index) => {
      return (
        <ListGroup.Item key={index}>
          <h3><Link to={`/games/${ratingGame.game.igdbid}`}>{ratingGame.game.name}</Link></h3>
          <h4>{ratingGame.rating} / 5</h4>
          <h4>{ratingGame.commentTitle}</h4>
          <p>{ratingGame.comment}</p>
          <p>rated on {ratingGame.publishedDate}</p>
        </ListGroup.Item>
      )
    })
  }

  render() {
    return (
      <div>
        <h2>Your Ratings</h2>
          <ListGroup variant="flush">
            {this.ratingList()}
          </ListGroup>
      </div>
    )
  }
}

export default CurrentUserRatingsPage
