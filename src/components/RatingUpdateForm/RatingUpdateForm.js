import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import RatingsAPI from '../../api/RatingsAPI'
import { Form, Button } from 'react-bootstrap'
import './RatingUpdateForm.css'

class RatingUpdateForm extends Component {
  state = {
    ratingId: this.props.match.params.ratingID,
    igdbId: this.props.match.params.gameID,
    ratingSaved: false,
    ratingObj: {
      author: "",
      comment: "",
      game: "",
      id: "",
      published_date: "",
      rating: "",
      title: "",
      username: ""
    }
  }

  componentDidMount() {
    RatingsAPI.fetchRatingsById(this.state.ratingId, this.props.token)
      .then(response => response.json())
      .then(jsonResponse => this.setState({ratingObj: jsonResponse}))
  }

  saveForm(event) {
    event.preventDefault()
    let updatedRatingObj = {
      title: event.target.elements.title.value,
      comment: event.target.elements.comment.value,
      rating: parseInt(event.target.elements.rating.value),
    }
    RatingsAPI.updateRating(this.state.ratingId, updatedRatingObj, this.props.token)
      .then(response => response.json())
      .then(_jsonResponse => this.setState({ratingSaved: true}))
  }

  deleteRating(event) {
    event.preventDefault()
    RatingsAPI.deleteRating(this.state.ratingId, this.props.token)
      .then(_response => this.setState({ratingSaved: true}))
  }

  render() {
    return (
      <div className="formDiv mt-5 mx-5 text-left">
        {!this.props.token && <Redirect to="/login" />}
        {this.state.ratingSaved && <Redirect to={`/games/${this.state.igdbId}`} />}
        <h2>Update Rating</h2>
        {this.state.ratingObj.rating &&
        <Form className="py-4" onSubmit={(event) => this.saveForm(event)}>
          <Form.Group className="pt-3">
            <Form.Label>Select Rating</Form.Label>
            <Form.Control required name="rating" as="select" defaultValue={this.state.ratingObj.rating} >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="pt-3">
            <Form.Label>Headline</Form.Label>
            <Form.Control name="title" type="text" defaultValue={this.state.ratingObj.title} placeholder="Enter headline (optional)" />
          </Form.Group>
          <Form.Group className="pt-3">
            <Form.Label>Comment</Form.Label>
            <Form.Control name="comment" as="textarea" rows="3" defaultValue={this.state.ratingObj.comment} placeholder="Enter comment (optional)" />
          </Form.Group>
          <Button className="mt-5 font-weight-bold" variant="light" type="submit">Submit</Button>
        </Form>
        }
        <Button className="mt-3 font-weight-bold" variant="light" variant="outline-warning" onClick={(event) => {this.deleteRating(event)}}>Delete This Rating</Button>
      </div>
    )
  }
}

export default RatingUpdateForm
