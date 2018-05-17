import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyDZsVKQ_TIUKx_emAIrKRGJzCUgcMBtTLo',
  authDomain: 'giphyapp-eb17a.firebaseapp.com',
  databaseURL: 'https://giphyapp-eb17a.firebaseio.com',
  projectId: 'giphyapp-eb17a',
  storageBucket: '',
  messagingSenderId: '900652514633'
}

firebase.initializeApp(config)

export default firebase
