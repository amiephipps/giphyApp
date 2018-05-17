import React from 'react'
import './styles.scss'

class SingleGif extends React.Component {
  constructor () {
    super()

    this.state = {

    }
  }

  componentDidMount () {

  }

  render () {
    return (
      // <div className='singleGif' style={{ backgroundImage: `url('${this.props.images.downsized_medium.url}')` }}>
      <div className='singleGif'>
        <div>
          <button onClick={() => { this.props.upvoteGif(this.props.id) }}>Upvote</button>
          {this.props.upvoteCount ? <p>{this.props.upvoteCount}</p> : null}
          <h4>{this.props.title}</h4>
          {this.props.source
            ? <p>Click <a href={this.props.source} target='_blank' rel='noopener noreferrer'>here</a> to see where this thing came from!</p>
          : null}
        </div>
      </div>
    )
  }
}

export default SingleGif
