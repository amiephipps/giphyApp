import React from 'react'
import SingleGif from '../singleGif'
import Util from '../../global/js/utilities'

class Homepage extends React.Component {
  constructor () {
    super()

    this.state = {
      defaultGifs: [],
      isLoading: true
    }
  }

  componentDidMount () {
    Util.searchGifs('fun')
    .then((response) => {
      this.setState({ defaultGifs: response.data, isLoading: false })
    })
    .catch((err) => {
      this.setState({ isLoading: false })
      console.error('Error: ', err)
    })
  }

  render () {
    return (
      <div>
        <h1 className='u-alignCenter'>Giphalicious</h1>
        <p className='u-alignCenter'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam dolor accusamus atque itaque, vitae, laboriosam iure culpa incidunt temporibus! Fuga repellendus voluptatibus nisi beatae suscipit! Consequuntur cumque nobis magni iusto omnis expedita quidem voluptates doloremque incidunt earum odit voluptatum quasi, praesentium aspernatur ipsum, pariatur impedit, architecto vel eum, voluptate? Nobis.</p>
        {this.state.defaultGifs.length
          ? <div className='grid'>
            {this.state.defaultGifs.map(gif => {
              return <div className='grid-1of3'>
                <SingleGif {...gif} />
              </div>
            })}
          </div>
        : <h2>No Gifs</h2>
        }
      </div>
    )
  }
}

export default Homepage
