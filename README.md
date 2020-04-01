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
		user: {}
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

	render() {
		return (
			<AuthContext.Provider
				value={{
					user: this.state.user
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

In the main component, in my case, `App.js`, import the context provider

```javascript
import AuthProvider from './components/AuthContext';

class App extends React.Component {
	render() {
		return (
			<div className="root-class">
				<BrowserRouter>
					<AuthProvider>// children components</AuthProvider>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
```

Finally, using context consumer in a child component

```javascript
import React from 'react';
import logo from '../components/img/logo.png';
import '../components/css/NavBar.css';
import { withRouter } from 'react-router-dom';
import { AuthConsumer } from '../components/AuthContext';

class NavBar extends React.Component {
	goToHome = userId => {
		this.props.history.push({
			pathname: `/${userId}/home`
		});
	};
	render() {
		return (
			<AuthConsumer>
				{({ user }) => (
					<>
						<nav className="navbar navbar-expand-sm navbar-light">
							<span className="navbar-brand text-white" onClick={() => this.goToHome(user.id)}>
								<img src={logo} width="40" height="30" alt="" />
								Notepad
							</span>
						</nav>
					</>
				)}
			</AuthConsumer>
		);
	}
}

export default withRouter(NavBar);
```

## License

MIT Copyright (c) 2020 Abdiwadud Mahamad

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
