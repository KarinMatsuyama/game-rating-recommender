import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Nav } from 'react-bootstrap'
import { FacebookShareButton, TwitterShareButton, EmailShareButton, FacebookIcon, TwitterIcon, EmailIcon } from 'react-share'
import GameDetail from '../components/GameDetail/GameDetail'
import GameRatings from '../components/GameRatings/GameRatings'
import IgdbAPI from '../api/IgdbAPI'
import RatingsAPI from '../api/RatingsAPI';
import UsersAPI from '../api/UsersAPI';
import GameVideo from '../components/GameVideo/GameVideo'
import './GamePage.css'

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
        genresPlatforms.genreIds && IgdbAPI.fetchGenres(genresPlatforms.genreIds)
          .then(jsonResponse => this.setState({genres: jsonResponse}))
        genresPlatforms.platformIds && IgdbAPI.fetchPlatforms(genresPlatforms.platformIds)
          .then(jsonResponse => this.setState({platforms: jsonResponse}))
      })
    
    RatingsAPI.fetchGameByIgdbId(this.state.gameId)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.length > 0) {
          this.setState({ratingGameId: jsonResponse[0].id})
        } else {
          this.setState({ratingGameId: false})
        }
      })
    if (this.props.token) {
      UsersAPI.getCurrentUser(this.props.token)
        .then(jsonResponse => RatingsAPI.fetchRatingsForCurrentUser(jsonResponse.id, this.props.token))
        .then(response => response.json())
        .then(jsonResponse => this.setState({currentUserRatings: jsonResponse}))
        .then(_res => this.hasUerRated())
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.gameID !== this.props.match.params.gameID) {
      this.setState({gameId: this.props.match.params.gameID, hasRated: false}, 
        () => {
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
              genresPlatforms.genreIds && IgdbAPI.fetchGenres(genresPlatforms.genreIds)
                .then(jsonResponse => this.setState({genres: jsonResponse}))
              genresPlatforms.platformIds && IgdbAPI.fetchPlatforms(genresPlatforms.platformIds)
                .then(jsonResponse => this.setState({platforms: jsonResponse}))
            })
          
          RatingsAPI.fetchGameByIgdbId(this.state.gameId)
            .then(response => response.json())
            .then(jsonResponse => {
              if (jsonResponse.length > 0) {
                this.setState({ratingGameId: jsonResponse[0].id})
              } else {
                this.setState({ratingGameId: false})
              }
            })
          if (this.props.token) {
            UsersAPI.getCurrentUser(this.props.token)
              .then(jsonResponse => RatingsAPI.fetchRatingsForCurrentUser(jsonResponse.id, this.props.token))
              .then(response => response.json())
              .then(jsonResponse => this.setState({currentUserRatings: jsonResponse}))
              .then(_res => this.hasUerRated())
          }
        })
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
    console.log(this.props.match.params.gameID)
    return (
      <div>
        {this.state.name && 
          <GameVideo  name={this.state.name} />
        }

        <Nav className="my-3 justify-content-center" style={{"padding-top": "5px"}}>
          <FacebookShareButton url={window.location.href} style={{cursor: "pointer"}}>
            <FacebookIcon size="2.5rem" />
          </FacebookShareButton>
          <TwitterShareButton url={window.location.href} style={{cursor: "pointer"}}>
            <TwitterIcon size="2.5rem" />
          </TwitterShareButton>
          <EmailShareButton url={window.location.href} style={{cursor: "pointer"}}>
            <EmailIcon size="2.5rem" />
          </EmailShareButton>
        </Nav>

        {this.state.ratingGameId != null && 
          <GameDetail token={this.props.token} ratingGameId={this.state.ratingGameId} name={this.state.name} criticRating={this.state.criticRating} releaseDate={this.state.releaseDate} summary={this.state.summary} coverId={this.state.coverId} genres={this.state.genres.map(genreObj => genreObj.name)} platforms={this.state.platforms.map(platformObj => platformObj.name)} similarGameIds={this.state.similarGameIds} />
        }

        {!this.state.hasRated && <Button className="mt-5 mb-4 font-weight-bold" variant="light" size="lg" block><Link className="link" to={{pathname: `/rate-game/${this.state.gameId}`, state:{name: this.state.name, criticRating: this.state.criticRating, genres: this.state.genres.map(genreObj => genreObj.name), platforms: this.state.platforms.map(platformObj => platformObj.name)}}}>RATE THIS GAME</Link></Button>}

        {this.state.hasRated && <Button className="mt-5 mb-4 font-weight-bold" variant="light" size="lg" block><Link className="link" to={`/edit-rating/${this.state.gameId}/${this.state.ratingId}`}>EDIT / DELETE YOUR RATING</Link></Button>}

        {this.state.ratingGameId && <GameRatings ratingGameId={this.state.ratingGameId} token={this.props.token} />}
      </div>
    )
  }
}

export default GamePage
