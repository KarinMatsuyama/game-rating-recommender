import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import GameDetail from '../components/GameDetail/GameDetail'
import GameRatings from '../components/GameRatings/GameRatings'
import IgdbAPI from '../api/IgdbAPI'
import { Button } from 'react-bootstrap'
import RatingsAPI from '../api/RatingsAPI';
import UsersAPI from '../api/UsersAPI';

class GamePage extends Component {
  state = {
    gameId: this.props.match.params.gameID,
    name: '',
    criticRating: null,
    releaseDate: null,
    summary: '',
    coverId: null,
    similarGameIds: [],
    genres: [],
    platforms: [],
    ratingGameId: null,
    currentUserRatings: [],
    ratingId: null,
    hasRated: false
  }

  componentDidMount() {
    let genresPlatforms = {
      genreIds: [],
      platformIds: []
    }
    IgdbAPI.fetchGamesById([this.state.gameId])
      .then(jsonResponse => {
        this.setState({
        name: jsonResponse[0].name,
        criticRating: jsonResponse[0]['aggregated_rating'] ? Math.round(parseFloat(jsonResponse[0]['aggregated_rating'])) : 'N/A',
        releaseDate: jsonResponse[0]['first_release_date'],
        summary: jsonResponse[0].summary,
        coverId: jsonResponse[0].cover,
        similarGameIds: jsonResponse[0]['similar_games']
      })
      genresPlatforms.genreIds = jsonResponse[0].genres
      genresPlatforms.platformIds = jsonResponse[0].platforms
      })
      .then(_res => {
        IgdbAPI.fetchGenres(genresPlatforms.genreIds)
          .then(jsonResponse => this.setState({genres: jsonResponse}))
        IgdbAPI.fetchPlatforms(genresPlatforms.platformIds)
          .then(jsonResponse => this.setState({platforms: jsonResponse}))
      })
    
    if (this.props.token) {
      RatingsAPI.fetchGameByIgdbId(this.state.gameId, this.props.token)
        .then(response => response.json())
        .then(jsonResponse => {
          if (jsonResponse.length > 0) {
            this.setState({ratingGameId: jsonResponse[0].id})
          }
        })
        .then(_res => UsersAPI.getCurrentUser(this.props.token))
        .then(jsonResponse => RatingsAPI.fetchRatingsForCurrentUser(jsonResponse.id, this.props.token))
        .then(response => response.json())
        .then(jsonResponse => this.setState({currentUserRatings: jsonResponse}))
        .then(_res => this.hasUerRated())
    }
  }

  hasUerRated() {
    let ratings = this.state.currentUserRatings
    for (let i = 0; i < ratings.length; i++) {
      if (ratings[i].game === this.state.ratingGameId) {
        this.setState({hasRated: true, ratingId: ratings[i].id})
      }
    }
  }

  render() {
    console.log(this.state)
    return (
      <div>
        {this.state.name && 
        <GameDetail id={this.state.id} name={this.state.name} criticRating={this.state.criticRating} releaseDate={this.state.releaseDate} summary={this.state.summary} coverId={this.state.coverId} genres={this.state.genres.map(genreObj => genreObj.name)} platforms={this.state.platforms.map(platformObj => platformObj.name)} similarGameIds={this.state.similarGameIds} />
        }

        {!this.state.hasRated && <Button variant="secondary" size="lg" block><Link to={{pathname: `/rate-game/${this.state.gameId}`, state:{name: this.state.name, criticRating: this.state.criticRating, genres: this.state.genres.map(genreObj => genreObj.name), platforms: this.state.platforms.map(platformObj => platformObj.name)}}}>Rate This Game</Link></Button>}

        {this.state.hasRated && <Button variant="secondary" size="lg" block><Link to={`/edit-rating/${this.state.gameId}/${this.state.ratingId}`}>Edit / Delete Your Rating</Link></Button>}

        {this.props.token && this.state.ratingGameId && <GameRatings ratingGameId={this.state.ratingGameId} token={this.props.token} />}
      </div>
    )
  }
}

export default GamePage
