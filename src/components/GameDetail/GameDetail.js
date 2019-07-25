import React, {Component} from 'react'
import IgdbAPI from '../../api/IgdbAPI'
import GameList from '../GameList/GameList'

class GameDetail extends Component {
  state = {
    imageUrl: null,
    games: []
  }

  componentDidMount = () => {
    // IgdbAPI.fetchGamesById(this.props.similarGameIds)
    //   .then(jsonResponse => this.setState({games: jsonResponse}))
    let image = []
    if (this.props.coverId) {
      IgdbAPI.fetchCover(this.props.coverId)    
        .then(jsonResponse => image = jsonResponse[0].url.split('/'))
        .then(_response => this.setState({imageUrl: `https://images.igdb.com/igdb/image/upload/t_cover_big/${image[image.length - 1]}`}))
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
    console.log(this.state)
    const {id, name, criticRating, releaseDate, summary} = this.props
    return (
      <div>
        <h2>{name}</h2>
        <img src={this.state.imageUrl} alt="cover image" />
        <h3>Critic Score: {criticRating}</h3>
        <h3>Genre: {this.props.genres.join(', ')}</h3>
        <h3>Platform: {this.props.platforms.join(', ')}</h3>
        <p>Released on {this.getReleaseDate(releaseDate)}</p>
        <p>{summary}</p>

        <h2>Similar Games</h2>
        {/* <GameList games={this.state.games} /> */}
      </div>
    )
  }
}

export default GameDetail
