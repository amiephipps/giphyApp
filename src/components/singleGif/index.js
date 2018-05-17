import React from 'react'
import './styles.scss'

class SingleGif extends React.Component {
  constructor () {
    super()

    this.state = {
      expandGif: false
    }

    this.clickHandler = this.clickHandler.bind(this)
  }

  clickHandler () {
    this.setState({ expandGif: !this.state.expandGif })
  }

  render () {
    console.log(this.props)
    return (
      <div className='singleGif' style={{ backgroundImage: `url('${this.props.images.downsized_medium.url}')` }} onClick={this.clickHandler}>
        <div>
          <button onClick={() => { this.props.upvoteGif(this.props.id) }}>Upvote</button>
          <p>{this.props.upvoteCount}</p>
        </div>
        {this.state.expandGif
          ? <div className='singleGif-modalWrapper'>
            <button className='singleGif-modalClose' onClick={this.clickHandler}>X</button>
            <div className='singleGif-modal' style={{ backgroundImage: `url('${this.props.images.downsized_medium.url}')` }} />
            <div className='singleGif-modalInfo'>
              <h4>{this.props.title}</h4>
              {this.props.source
                ? <p>Click <a href={this.props.source} target='_blank' rel='noopener noreferrer'>here</a> to see where this thing came from!</p>
              : null}
            </div>
          </div>
        : null}
      </div>
    )
  }
}

export default SingleGif
