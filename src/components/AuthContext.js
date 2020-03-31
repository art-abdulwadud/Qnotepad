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

export default withRouter(AuthProvider);
export { AuthConsumer };
