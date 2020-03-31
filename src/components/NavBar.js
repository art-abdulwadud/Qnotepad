import React from 'react';
import logo from '../components/img/logo.png';
import '../components/css/NavBar.css'
import {withRouter} from 'react-router-dom';
import { AuthConsumer } from '../components/AuthContext';

class NavBar extends React.Component{
    goToHome = (userId) => {
      this.props.history.push({
        pathname: `/${userId}/home`
      })
    }
    goToPlainNotes = (userId) => {
      this.props.history.push({
        pathname: `/${userId}/plain-notes`
      })
    }
    goToPlainSurahs = (userId) => {
      this.props.history.push({
        pathname: `/${userId}/surahs`
      })
    }
    render(){
        return(
          <AuthConsumer>
            {({ user, logOut }) => (
                <>
                <nav className="navbar navbar-expand-sm navbar-light">
                    <span className="navbar-brand text-white" onClick={() => this.goToHome(user.id)}>
                        <img src={logo} width="40" height="30" alt=""/>
                        Notepad
                    </span>
                    {user.id ? (
                      <>
                      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav text-center ml-auto">
                        <li className="nav-item"><span className="nav-link text-white" 
                        onClick={() => this.goToHome(user.id)}>Home</span></li>
                        <li className="nav-item dropdown" >
                          <span className="nav-link dropdown-toggle cursor"
                          id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" 
                          aria-expanded="false">
                            My Account
                          </span>
                          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <span className="dropdown-item" onClick={() => this.goToPlainNotes(user.id)}>Plain Notes</span>
                            <span className="dropdown-item" onClick={() => this.goToPlainSurahs(user.id)}>Surahs</span>
                            <div className="dropdown-divider"></div>
                            <span className="dropdown-item" onClick={() => logOut()}>
                              Log Out
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                    </>): (<span></span>)}
                    
                </nav>
                </>
            )}
          </AuthConsumer>
        )
    }
}

export default withRouter(NavBar);