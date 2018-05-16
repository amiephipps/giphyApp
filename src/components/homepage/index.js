import React from 'react'
import Util from '../../global/js/utilities'

export default class Homepage extends React.Component {
  constructor () {
    super()

    this.state = {
      defaultGifs: []
    }
  }

  componentDidMount () {
    Util.searchGifs('fun')
    .then((response) => {
      this.setState({ defaultGifs: response.data })
      console.log(response.data, 'response from api')
    })
  }

  render () {
    return (
      <div>
        <h1>hi</h1>
        {this.state.defaultGifs.length
          ? this.state.defaultGifs.map(gif => {
            return <img key={`${gif.url}`} src={`${gif.images.fixed_height_downsampled}`} alt='' />
          })
        : <h2>No Gifs</h2>
        }
      </div>
    )
  }
}
