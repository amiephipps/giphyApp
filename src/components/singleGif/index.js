import React from 'react'

class SingleGif extends React.Component {
  constructor () {
    super()

    this.state = {

    }
  }

  componentDidMount () {

  }

  render () {
    // const { background}
    console.log(this.props, 'props inside of single gif')
    return (
      <div className='singleGif-wrapper' style={{ backgroundImage: `url('${this.props.images.downsized_medium.url}')` }}>
        <div>
          <h4>{this.props.title}</h4>
        </div>
      </div>
    )
  }
}

export default SingleGif
