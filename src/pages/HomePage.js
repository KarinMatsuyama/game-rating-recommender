import React, { Component } from 'react'
import GameList from '../components/GameList/GameList'
import IgdbAPI from '../api/IgdbAPI'
import './HomePage.css'
class HomePage extends Component {
  componentDidMount = () => {
    IgdbAPI.fetchPopularGames()
      .then(jsonResponse => this.props.setGames(jsonResponse))
    IgdbAPI.fetchComingSoon()
      .then(jsonResponse => this.props.setComingGames(jsonResponse))
  }

  render() {
    return (
      <div className="pb-5">
        <h2 className="sectionTitle">POPULAR GAMES</h2>
        {this.props.games.length > 0 && <GameList games={this.props.games} />}
        <h2 className="sectionTitle">COMING SOON</h2>
        {this.props.games.length > 0 && <GameList games={this.props.comingGames} />}
      </div>
    )
  }
}

export default HomePage
