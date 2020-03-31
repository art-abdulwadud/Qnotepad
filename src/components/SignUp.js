import React, { Component } from 'react';
import { AuthConsumer } from './AuthContext';
import { withRouter } from 'react-router-dom'


class SignUp extends Component {
    emailEntry = React.createRef()
    passwordEntry = React.createRef()
    goToHome = () => {
      this.props.history.push({
        pathname: '/home'
      })
    }
    render() {
        return (
            <AuthConsumer>
                {({signUp}) => (
                    <div>
                        <form className="m-2">
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Email address</label>
                              <input type="email" className="form-control" 
                              id="exampleInputEmail1" 
                              aria-describedby="emailHelp" 
                              placeholder="Enter email"
                              ref={this.emailEntry}/>
                              <small id="emailHelp" className="form-text text-white">
                                  Not required to enter a real email
                              </small>
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputPassword1">Create Password</label>
                              <input type="password" className="form-control" 
                              id="exampleInputPassword1" 
                              placeholder="Create Password"
                              ref={this.passwordEntry}/>
                            </div>
                            <button type="submit" className="btn btn-primary"
                            onClick={e => signUp(
                                this.emailEntry.current.value,
                                this.passwordEntry.current.value, e
                            )}
                            >Sign up</button>
                        </form>
                    </div>
                )}
            </AuthConsumer>
            
        )
    }
}


export default withRouter(SignUp)
