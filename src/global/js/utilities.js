const API_KEY = 'aii23rhip1BPzTRUgKGOnYjsQsj17Kk3'
const LIMIT = 12

const Util = {}

Util.searchGifs = (searchTerm = '', gifLimit = LIMIT) => {
  return fetch(`http://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=${gifLimit}`)
  .then(res => res.json())
}

Util.searchTrendingGifs = (gifLimit = LIMIT) => {
  return fetch(`http://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${gifLimit}`)
  .then(res => res.json())
}

export default Util
