import React, { Component } from 'react'
import IgdbAPI from '../../api/IgdbAPI'
import { Link } from 'react-router-dom'

class IndivGame extends Component {
  state = {
    imageUrl: ''
  }

  componentDidMount = () => {
    let image = []
    if (this.props.cover) {
      IgdbAPI.fetchCover(this.props.cover)    
        .then(jsonResponse => image = jsonResponse[0].url.split('/'))
        .then(_response => this.setState({imageUrl: `https://images.igdb.com/igdb/image/upload/t_cover_big/${image[image.length - 1]}`}))
    } else {
      this.setState({imageUrl: null})
    }
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.id !== prevProps.id) {
      let image = []
      if (this.props.cover) {
        IgdbAPI.fetchCover(this.props.cover)    
          .then(jsonResponse => image = jsonResponse[0].url.split('/'))
          .then(_response => this.setState({imageUrl: `https://images.igdb.com/igdb/image/upload/t_cover_big/${image[image.length - 1]}`}))
      } else {
        this.setState({imageUrl: null})
      }
    }
  }

  render() {
    const {id, name, criticRating, genres, platforms, releaseDate, summary, similarGames} = this.props
    return (
      <div>
        <h2>{name}</h2>
        <h3>Critic Score: {criticRating}</h3>
        <Link to={{pathname: `/games/${id}`, state:{id: id, name: name, criticRating: criticRating, genres: genres, platforms: platforms, releaseDate: releaseDate, summary: summary, similarGames: similarGames, coverUrl: this.state.imageUrl}}}><img src={this.state.imageUrl} alt="cover image" /></Link>
      </div>
    )
  }
}

export default IndivGame
