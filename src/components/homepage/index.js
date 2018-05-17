import React from 'react'
import SearchBar from '../searchBar'
import SingleGif from '../singleGif'
import Util from '../../global/js/utilities'

import firebase from '../firebase'
import './styles.scss'

class Homepage extends React.Component {
  constructor () {
    super()

    this.state = {
      trendingGifs: [],
      searchedGifs: [],
      rankedGifs: {},
      isLoading: true,
      sortOptions: ['Highest Upvotes', 'Lowest Upvotes']
    }

    this.searchGifs = this.searchGifs.bind(this)
    this.showGifs = this.showGifs.bind(this)
    this.sortGifs = this.sortGifs.bind(this)
    this.upvoteGif = this.upvoteGif.bind(this)
    this.getUpvotedGifs = this.getUpvotedGifs.bind(this)
    this.addExistingUpvoteToGif = this.addExistingUpvoteToGif.bind(this)
  }

  upvoteGif (gifObjectId) {
    const dbRef = firebase.database().ref('rankedGifs')
    let upvoteCount = 1
    const existingRankedGif = Object.keys(this.state.rankedGifs).filter(key => {
      return this.state.rankedGifs[key].id === gifObjectId
    })
    if (existingRankedGif.length) {
      upvoteCount = this.state.rankedGifs[existingRankedGif].upvoteCount + 1
      const stuff = firebase.database().ref(`rankedGifs/${existingRankedGif}`)
      stuff.update({id: gifObjectId, upvoteCount})
    } else {
      dbRef.push({id: gifObjectId, upvoteCount})
    }
  }

  getUpvotedGifs (gifType) {
    // gets the gifs that have been upvoted and attaches them to the state
    // and then addExisting UpvoteToGif
    const dbRef = firebase.database().ref('rankedGifs')
    dbRef.on('value', (data) => {
      const rankedGifsObject = data.val()
      if (rankedGifsObject !== null) {
        Object.keys(rankedGifsObject).forEach((key) => {
          this.addExistingUpvoteToGif(rankedGifsObject[key], gifType)
        })
        this.setState({ rankedGifs: rankedGifsObject })
      }
    })
  }

  addExistingUpvoteToGif (rankedGifObject, gifType) {
    let gifsArrayCopy = Array.from(this.state[gifType])
    gifsArrayCopy = gifsArrayCopy.map(gif => {
      gif.upvoteCount = gif.upvoteCount || 0
      if (gif.id === rankedGifObject.id) gif.upvoteCount = rankedGifObject.upvoteCount

      return gif
    })

    this.setState({ [gifType]: gifsArrayCopy })
  }

  searchGifs (searchTerm) {
    if (!searchTerm) return

    this.setState({ isLoading: true })
    Util.searchGifs(searchTerm)
    .then((response) => {
      this.setState({ searchedGifs: response.data, isLoading: false })
      this.getUpvotedGifs('searchedGifs')
    })
    .catch((err) => {
      this.setState({ isLoading: false })
      console.error('Error: ', err)
    })
  }

  componentDidMount () {
    Util.searchTrendingGifs()
    .then((response) => {
      this.setState({ trendingGifs: response.data, isLoading: false })
      this.getUpvotedGifs('trendingGifs')
    })
    .catch((err) => {
      this.setState({ isLoading: false })
      console.error('Error: ', err)
    })
  }

  sortGifs (option) {
    console.log(option)
    let trendingGifsCopy = Array.from(this.state.trendingGifs)
    // let searchGifsCopy = Array.from(this.state.searchGifs)

    // if (this.state.searchGifs.length) {

    // } else {

    // }
    // this sorts from lowest to highest
    // trendingGifsCopy = trendingGifsCopy.sort((a, b) => a.upvoteCount - b.upvoteCount)

    trendingGifsCopy = trendingGifsCopy.sort((a, b) => b.upvoteCount - a.upvoteCount)

    this.setState({ trendingGifs: trendingGifsCopy })
  }

  showGifs (gifType) {
    return (
      <div className='grid'>
        {this.state[gifType].map(gif => {
          return <div key={gif.id} className='grid-1of3'>

            <SingleGif {...gif} upvoteGif={this.upvoteGif} />
          </div>
        })}
      </div>
    )
  }

  render () {
    return (
      <div className='homepage container'>
        <h1 className='u-alignCenter'>Giphalicious</h1>
        <p className='u-alignCenter'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam dolor accusamus atque itaque, vitae, laboriosam iure culpa incidunt temporibus! Fuga repellendus voluptatibus nisi beatae suscipit! Consequuntur cumque nobis magni iusto omnis expedita quidem voluptates doloremque incidunt earum odit voluptatum quasi, praesentium aspernatur ipsum, pariatur impedit, architecto vel eum, voluptate? Nobis.</p>
        <SearchBar searchGifs={this.searchGifs} />
        <p className='homepage-sortLabel'>Sort By:
        {this.state.sortOptions.map(option => {
          return <span key={option} onClick={() => { this.sortGifs(option) }}> {option} </span>
        })}
        </p>
        {this.state.isLoading
          ? <div className='loading' />
          : this.state.searchedGifs.length ? this.showGifs('searchedGifs') : this.showGifs('trendingGifs')
        }
      </div>
    )
  }
}

export default Homepage
