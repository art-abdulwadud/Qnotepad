# A fullstack web-app with React and Firebase(Firestore)

[Qnotepad](https://qnotepad.netlify.com/) is a small web-app for saving normal plain notes and with an extra feature for saving Quran studies in an organized manner.

[Have a look](https://qnotepad.netlify.com/)

## Intializing Firebase

After creating a firestore database in [Firebase](https://firebase.google.com/), create a file named `firebase.js` and your firebase configurations

```javascript
import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
	// write your configuraions here e.g
	apiKey: '**********************************',
	authDomain: '******************************',
	databaseURL: '********************************',
	projectId: '************',
	storageBucket: '**************************',
	messagingSenderId: '**********************',
	appId: '**********************************',
	measurementId: '****************************************'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
```

## Creating user authentication

After initializing, now create users collection and export it

```javascript
const users = db.collection('users');

export { users };
```

In my case, for adding a new user to the `users` collection, i used context api.

Okay, so in the `firebase.js` file, import `auth`, initialize it and then export it.

```javascript
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
	// write your configuraions here e.g
	apiKey: '**********************************',
	authDomain: '******************************',
	databaseURL: '********************************',
	projectId: '************',
	storageBucket: '**************************',
	messagingSenderId: '**********************',
	appId: '**********************************',
	measurementId: '****************************************'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const firebaseAuth = firebase.auth();

const users = db.collection('users');

export { users, firebaseAuth };
```


