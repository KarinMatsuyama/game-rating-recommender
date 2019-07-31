import React, { Component } from 'react'
import { Media } from 'react-bootstrap'
import './GameDetail.css'
import IgdbAPI from '../../api/IgdbAPI'
import GameList from '../GameList/GameList'
import RatingsAPI from '../../api/RatingsAPI';

class GameDetail extends Component {
  state = {
    imageUrl: null,
    games: [],
    averageRating: null
  }

  componentDidMount = () => {
    IgdbAPI.fetchGamesById(this.props.similarGameIds)
      .then(jsonResponse => this.setState({games: jsonResponse}))
    let image = []
    if (this.props.coverId) {
      IgdbAPI.fetchCover(this.props.coverId)    
        .then(jsonResponse => image = jsonResponse[0].url.split('/'))
        .then(_response => this.setState({imageUrl: `https://images.igdb.com/igdb/image/upload/t_cover_big/${image[image.length - 1]}`}))
    }
    if (this.props.ratingGameId) {
      RatingsAPI.fetchAverageRating(this.props.ratingGameId)
        .then(response => response.json())
        .then(jsonResponse => this.setState({averageRating: jsonResponse}))
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props) {
      IgdbAPI.fetchGamesById(this.props.similarGameIds)
        .then(jsonResponse => this.setState({games: jsonResponse}))
      let image = []
      if (this.props.coverId) {
        IgdbAPI.fetchCover(this.props.coverId)    
          .then(jsonResponse => image = jsonResponse[0].url.split('/'))
          .then(_response => this.setState({imageUrl: `https://images.igdb.com/igdb/image/upload/t_cover_big/${image[image.length - 1]}`}))
      } else {
        this.setState({imageUrl: null})
      }
      if (this.props.ratingGameId) {
        RatingsAPI.fetchAverageRating(this.props.ratingGameId)
          .then(response => response.json())
          .then(jsonResponse => this.setState({averageRating: jsonResponse}))
      } else {
        this.setState({averageRating: null})
      }
    }
  }

  getReleaseDate = (unixTimeStamp) => {
    let dateTime = new Date(unixTimeStamp * 1000)
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    let year = dateTime.getFullYear()
    let month = months[dateTime.getMonth()]
    let date = dateTime.getDate()
    return `${month} ${date}, ${year}`
  }

  render() {
    const {name, criticRating, releaseDate, summary} = this.props
    return (
      <div>
        <Media className="media">
          <img className="coverImg" src={this.state.imageUrl} alt="cover image" />
          <Media.Body className="mediaBody">
            <h2>{name}</h2>
            <h5>Released on {this.getReleaseDate(releaseDate)}</h5>
            <h4 className="mt-3 pl-2">Critic Score: {criticRating}</h4>
            <h4 className="mt-1 pl-2">Average User Rating: {this.state.averageRating ? <span>{this.state.averageRating} / 5</span>: <span>This game has not been rated</span>}</h4>
            <h4 className="mt-1 pl-2">Genre: {this.props.genres.join(', ')}</h4>
            <h4 className="mt-1 pl-2">Platforms: {this.props.platforms.join(', ')}</h4>
            <h5 className="mt-4">{summary}</h5>
          </Media.Body>
        </Media>
        <h2 className="similarGames">SIMILAR GAMES</h2>
        <GameList games={this.state.games} />
      </div>
    )
  }
}

export default GameDetail
