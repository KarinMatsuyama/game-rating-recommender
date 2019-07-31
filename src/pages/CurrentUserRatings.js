import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import UsersAPI from '../api/UsersAPI'
import RatingsAPI from '../api/RatingsAPI'
import { ListGroup } from 'react-bootstrap'
import './HomePage.css'
import './CurrentUserRating.css'

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
          <h3><Link className="rate-link" to={`/games/${ratingGame.game.igdbid}`}>{ratingGame.game.name}</Link></h3>
          <h4>{ratingGame.rating} / 5</h4>
          <h5>{ratingGame.commentTitle}</h5>
          <h5>{ratingGame.comment}</h5>
          <p>Rated on {ratingGame.publishedDate.split('T')[0]}</p>
        </ListGroup.Item>
      )
    })
  }

  render() {
    return (
      <div>
        {!this.props.token && <Redirect to="/login" />}
        <h2 className="sectionTitle pb-3">Your Ratings</h2>
          <ListGroup className="userRatingList text-left" variant="flush">
            {this.ratingList()}
          </ListGroup>
      </div>
    )
  }
}

export default CurrentUserRatingsPage
