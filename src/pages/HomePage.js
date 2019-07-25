import React, { Component } from 'react'
import GameList from '../components/GameList/GameList'
import IgdbAPI from '../api/IgdbAPI'

class HomePage extends Component {
  componentDidMount = () => {
    IgdbAPI.fetchPopularGames()
      .then(jsonResponse => this.props.setGames(jsonResponse))
  }

  render() {
    return (
      <div>
        <h2>Popular Games</h2>
        <GameList games={this.props.games} />
      </div>
    )
  }
}

export default HomePage
