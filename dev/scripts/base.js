

import Rebase from 're-base';
import firebase from 'firebase';
// import database from 'firebase/database';

const app = firebase.initializeApp({
	apiKey: "AIzaSyC5EY68vjILfBRqmArnNrQeJiFtz6A_2sY",
	authDomain: "icecream-app.firebaseapp.com",
	databaseURL: "https://icecream-app.firebaseio.com",
	storageBucket: "icecream-app.appspot.com"
});

var base = Rebase.createClass(app.database());
console.log (base);

export default base;