import React, { Component } from 'react';
import SignUp from '../SignUp';
import Login from '../Login';

export default class SignUpAndLoginPage extends Component {
    state = {
        loginActive: true
    }
    loginActive = () => {
        this.setState({loginActive: true})
    }
    signUpActive = () => {
        this.setState({loginActive: false})
    }
    render() {
        return (
            <div className="page-body">
                <div className="body-wrapper p-3">
                    <div className="options">
                        <span className="left-option" 
                        id={this.state.loginActive ? "option-not-active": "visible"}
                        onClick={this.signUpActive}>Sign Up</span>
                        <span className="right-option" 
                        id={this.state.loginActive ? "visible": "option-not-active"}
                        onClick={this.loginActive}>Login</span>
                    </div>
                    <div className="sign-in"
                    id={this.state.loginActive ? "visible": "hidden"}>
                        <h1 className="option-title mt-2">Login</h1>
                        <Login />
                    </div>
                    <div className="sign-up"
                    id={this.state.loginActive ? "hidden": "visible"}>
                        <h1 className="option-title mt-2">Sign Up</h1>
                        <SignUp />
                    </div>
                </div>
            </div>
        )
    }
}
