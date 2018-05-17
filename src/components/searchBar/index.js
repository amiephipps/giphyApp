import React from 'react'
import './styles.scss'

class SearchBar extends React.Component {
  constructor () {
    super()

    this.state = {
      searchTerm: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render () {
    return (
      <div className='searchBar'>
        <form onSubmit={(e) => { e.preventDefault(); this.props.searchGifs(this.state.searchTerm) }}>
          <input type='text' className='searchBar-input' name='searchTerm' placeholder='Search' value={this.state.searchTerm} onChange={this.handleChange} />
        </form>
      </div>
    )
  }
}

export default SearchBar
