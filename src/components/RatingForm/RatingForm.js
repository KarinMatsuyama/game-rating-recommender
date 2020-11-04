import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import UsersAPI from '../../api/UsersAPI'
import RatingsAPI from '../../api/RatingsAPI'
import { Form, Button } from 'react-bootstrap'
import './RatingForm.css'

class RatingForm extends Component {
  state = {
    gameExist: false,
    igdbId: this.props.match.params.gameID,
    ratingSaved: false,
    ratingGameId: null,
    currentUserRatings: [],
    ratingId: null,
    hasRated: false
  }

  componentDidMount() {
    RatingsAPI.fetchGameByIgdbId(this.state.igdbId, this.props.token)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.length > 0) {
          this.setState({gameExist: true, ratingGameId: jsonResponse[0].id})
        }
      })
      .then(_res => UsersAPI.getCurrentUser(this.props.token))
      .then(jsonResponse => RatingsAPI.fetchRatingsForCurrentUser(jsonResponse.id, this.props.token))
      .then(response => response.json())
      .then(jsonResponse => this.setState({currentUserRatings: jsonResponse}))
      .then(_res => this.hasUerRated())
  }

  hasUerRated() {
    let ratings = this.state.currentUserRatings
    for (let i = 0; i < ratings.length; i++) {
      if (ratings[i].game === this.state.ratingGameId) {
        this.setState({hasRated: true, ratingId: ratings[i].id})
      }
    }
  }

  saveGame() {
    let gameObj = {
      name: this.props.location.state.name,
      genres: this.props.location.state.genres.join(','),
      critic_score: this.props.location.state.criticRating !== 'N/A' ? this.props.location.state.criticRating : null,
      platforms: this.props.location.state.platforms.join(','),
      igdbid: parseInt(this.state.igdbId)
    }
    return RatingsAPI.createGame(gameObj, this.props.token)
      .then(response => response.json())
  }

  saveForm(event) {
    event.preventDefault()
    let ratingObj = {
      game: null,
      author: null,
      title: event.target.elements.title.value,
      comment: event.target.elements.comment.value,
      rating: parseInt(event.target.elements.rating.value),
      username: this.props.username
    }
    
    if (this.state.gameExist) {
      RatingsAPI.fetchGameByIgdbId(this.state.igdbId, this.props.token)
        .then(response => response.json())
        .then(jsonResponse => ratingObj['game'] = jsonResponse[0].id)
        .then(_response => UsersAPI.getCurrentUser(this.props.token))
        .then(jsonResponse => ratingObj['author'] = jsonResponse.id)
        .then(_response => RatingsAPI.createRating(ratingObj, this.props.token))
        .then(response => response.json())
        .then(_jsonResponse => this.setState({ratingSaved: true}))
    } else {
      this.saveGame()
        .then(jsonResponse => ratingObj['game'] = jsonResponse.id)
        .then(_response => UsersAPI.getCurrentUser(this.props.token))
        .then(jsonResponse => ratingObj['author'] = jsonResponse.id)
        .then(_response => RatingsAPI.createRating(ratingObj, this.props.token))
        .then(response => response.json())
        .then(_jsonResponse => this.setState({ratingSaved: true}))
    }
  }

  render() {
    return (
      <div className="formDiv mt-5 mx-5 text-left">
        {!this.props.token && <Redirect to="/login" />}
        {this.state.ratingSaved && <Redirect to={`/game/${this.state.igdbId}`} />}
        {this.state.hasRated && <Redirect to={`/edit-rating/${this.state.igdbId}/${this.state.ratingId}`} />}
        <h2>Leave Your Rating</h2>
        <Form className="py-4" onSubmit={(event) => this.saveForm(event)}>
          <Form.Group className="pt-3">
            <Form.Label>Select Rating</Form.Label>
            <Form.Control required name="rating" as="select">
              <option></option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="pt-3">
            <Form.Label>Headline</Form.Label>
            <Form.Control name="title" type="text" placeholder="Enter headline (optional)" />
          </Form.Group>
          <Form.Group className="pt-3">
            <Form.Label>Comment</Form.Label>
            <Form.Control name="comment" as="textarea" rows="3" placeholder="Enter comment (optional)" />
          </Form.Group>
          <Button className="mt-5 font-weight-bold" variant="light" type="submit">Submit</Button>
        </Form>
      </div>
    )
  }
}

export default RatingForm
