import React, { Component } from 'react'
import queryString from 'query-string'
import GameList from '../components/GameList/GameList'
import IgdbAPI from '../api/IgdbAPI';

class SearchResultPage extends Component {
  componentDidMount() {
    const values = queryString.parse(this.props.location.search)
    const searchTerms = values.q
    IgdbAPI.searchGames(searchTerms)
      .then(jsonResponse => this.props.setGames(jsonResponse))
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchInput !== prevProps.searchInput) {
      const values = queryString.parse(this.props.location.search)
      const searchTerms = values.q
      IgdbAPI.searchGames(searchTerms)
        .then(jsonResponse => this.props.setGames(jsonResponse))
    }
  }

  render() {
    return (
      <div>
        <h2 className="sectionTitle">SEARCH RESULTS</h2>
        <GameList games={this.props.games} />
      </div>
    )
  }
}

export default SearchResultPage
