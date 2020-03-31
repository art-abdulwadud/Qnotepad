import React, { Component } from 'react';
import { AuthConsumer } from './AuthContext';
import { withRouter } from 'react-router-dom'

class Login extends Component {
    emailEntry = React.createRef()
    passwordEntry = React.createRef()

    render() {
        return (
            <AuthConsumer>
                {({logIn, errorMessage}) => (
                    <div>
                        {errorMessage ? <span>{errorMessage}</span>: <span></span>}
                        <form className="m-2">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Email address</label>
                              <input type="email" className="form-control" 
                              id="exampleInputEmail" 
                              aria-describedby="emailHelp" 
                              placeholder="Enter email"
                              ref={this.emailEntry}/>
                              <small id="emailHelp" className="form-text text-white">
                                  Login with the created email
                              </small>
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">Password</label>
                              <input type="password" className="form-control" 
                              id="exampleInputPassword" 
                              placeholder="Password"
                              ref={this.passwordEntry}/>
                            </div>
                            <button type="submit" className="btn btn-primary"
                            onClick={e => logIn(
                                this.emailEntry.current.value,
                                this.passwordEntry.current.value, e
                            )}
                            >Login</button>
                        </form>
                    </div>
                )}
            </AuthConsumer>
            
        )
    }
}


export default withRouter(Login)