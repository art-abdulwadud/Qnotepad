# A fullstack web-app with React and Firebase(Firestore)

[Qnotepad](https://qnotepad.netlify.com/) is a small web-app for saving normal plain notes and with an extra feature for saving Quran studies in an organized manner, created simply for educational purposes.

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

In my case, for adding a new user to the `users` collection, i used context api. React Context API is a way to essentially create global variables that can be passed around in a React app.

Create a component named `Context.js`, or in my case, `AuthContext.js`. Create context, provider, consumer and states.

```javascript
import React, { Component } from 'react';
import { firebaseAuth } from '../firebase';
import { withRouter } from 'react-router-dom';

const AuthContext = React.createContext();

class AuthProvider extends Component {
	state = {
		user: {},
		errorMessage: ''
	};

	UNSAFE_componentWillMount() {
		firebaseAuth.onAuthStateChanged(user => {
			if (user) {
				this.setState({
					user: {
						id: user.uid,
						email: user.email
					}
				});
			} else {
			}
		});
	}

	signUp = async (email, password, e) => {
		try {
			e.preventDefault();
			await firebaseAuth.createUserWithEmailAndPassword(email, password);
			this.props.history.push(`/${this.state.user.id}/home`);
			this.setState({
				errorMessage: ''
			});
		} catch (error) {
			this.setState({
				errorMessage: error.message
			});
		}
	};

	logIn = async (email, password, e) => {
		try {
			e.preventDefault();
			await firebaseAuth.signInWithEmailAndPassword(email, password);
			this.props.history.push(`/${this.state.user.id}/home`);
			this.setState({
				errorMessage: ''
			});
		} catch (error) {
			this.setState({
				errorMessage: error.message
			});
		}
	};

	logOut = async () => {
		try {
			await firebaseAuth.signOut();
			this.setState({ user: {} });
			this.props.history.push(`/`);
		} catch (error) {
			this.setState({
				errorMessage: error.message
			});
		}
	};

	render() {
		return (
			<AuthContext.Provider
				value={{
					user: this.state.user,
					signUp: this.signUp,
					logIn: this.logIn,
					logOut: this.logOut,
					errorMessage: this.state.errorMessage
				}}
			>
				{this.props.children}
			</AuthContext.Provider>
		);
	}
}

const AuthConsumer = AuthContext.Consumer;
```

Export the provide and consumer.

```javascript
export default withRouter(AuthProvider);
export { AuthConsumer };
```

