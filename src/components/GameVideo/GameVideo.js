import React, { Component } from 'react'
import { Carousel } from 'react-bootstrap'
import './GameVideo.css'
import YouTubeAPI from '../../api/YouTubeAPI';

class GameVideo extends Component {
  state = {
    videoIds: []
  }

  componentDidMount() {
    YouTubeAPI.fetchVideoByKeyword(this.props.name + ' trailer')
      .then(jsonResponse => jsonResponse.items && jsonResponse.items.map(item => {this.setState({videoIds: [...this.state.videoIds, item.id.videoId]})}))
      .then(_res => {
        YouTubeAPI.fetchVideoByKeyword(this.props.name + ' gameplay')
          .then(jsonResponse => jsonResponse.items && jsonResponse.items.map(item => {this.setState({videoIds: [...this.state.videoIds, item.id.videoId]})}))
      })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.name !== this.props.name) {
      this.setState({videoIds: []}, () => {
        YouTubeAPI.fetchVideoByKeyword(this.props.name + ' trailer')
          .then(jsonResponse => jsonResponse.items.map(item => {this.setState({videoIds: [...this.state.videoIds, item.id.videoId]})}))
          .then(_res => {
            YouTubeAPI.fetchVideoByKeyword(this.props.name + ' gameplay')
              .then(jsonResponse => jsonResponse.items.map(item => {this.setState({videoIds: [...this.state.videoIds, item.id.videoId]})}))
          })
      })
    }
  }

  videos = () => {
    return this.state.videoIds.map((videoId, index) => {return (
      <Carousel.Item key={index}>
        <iframe type="text/html" width="720" height="405" allow="autoplay" src={`https://www.youtube.com/embed/${videoId}?controls=0&modestbranding=1&color=white`} frameBorder="0"></iframe>
      </Carousel.Item>
    )})
  }

  render() {
    return (
      <Carousel className="video" interval={null}>
        {this.state.videoIds && this.videos()}
      </Carousel>
    )
  }
}

export default GameVideo
