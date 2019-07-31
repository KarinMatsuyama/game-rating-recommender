import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import RatingsAPI from '../api/RatingsAPI';
import GameList from '../components/GameList/GameList';
import IgdbAPI from '../api/IgdbAPI';
import './HomePage.css'

class RecommendationsPage extends Component {
  state = {
    games: []
  }

  componentDidMount() {
    if (this.props.token) {
      RatingsAPI.fetchRecommendations(this.props.token) 
        .then(response => response.json())
        .then(jsonResponse => {
          if (jsonResponse.length > 10) {
            return jsonResponse.slice(0, 10).map(gameObj => gameObj.igdbid)
          }
          return jsonResponse.map(gameObj => gameObj.igdbid)
        })
        .then(igdbidArr => IgdbAPI.fetchGamesById(igdbidArr))
        .then(jsonResponse => this.setState({games: jsonResponse}))
    }
  }

  render() {
    return (
      <div>
      {this.props.token ?
      <>
      <h2 className="sectionTitle pb-3">Video Game Recommendations for {this.props.username}</h2>
      <GameList games={this.state.games} />
      </> :
      <Redirect to="/login" />}
      </div>
    )
  }
}

export default RecommendationsPage
