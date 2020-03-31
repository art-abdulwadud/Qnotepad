import React from 'react';
import '../components/css/Welcome.css';
import backgroundVideo from './videos/vbg1.mp4';
import { FaEdit } from "react-icons/fa";
import { withRouter } from 'react-router-dom'
import notespic from './img/plain-notes.svg';
import surahspic from './img/surahs2.svg';

class Welcome extends React.Component {
      goToPlainNotes = () => {
        this.props.history.push({
          pathname: '/plain-notes'
        })
      }
      goToPlainSurahs = () => {
        this.props.history.push({
          pathname: '/surahs'
        })
      }
      render(){
        return(
            <div className="welcome-grid-wrapper">
                <div className="video-wrapper">
                    <video className='video' autoPlay loop muted>
                        <source src={backgroundVideo} type='video/mp4' />
                    </video>
                </div>
                <div className="inner-grid-wrapper mt-2">
                  <div className="text-wrapper center-wrapper text-center">
                      <h1 className="intro-heading">Plain notes</h1>
                      <p className="intro-text m-2">Create organised notes and be able to search through them at your own convenience. </p>
                      <div className="btn-group">
                          <button className="btn pl-5 pr-5 mr-2" onClick={this.goToPlainNotes}><FaEdit/> Plain Notes</button>
                        </div>
                  </div>
                  <div className="notes-illustration m-2">
                    <img src={notespic} alt="" className="notes-pic"/>
                  </div>
                  <div className="text-wrapper-two center-wrapper text-center">
                      <h1 className="intro-heading">Surahs</h1>
                      <p className="intro-text m-2">This section is for anyone studying the Qur'an in an Institution or on their own. You'll be able to record your findings from the Qur'an. For each surah, you can add notes, topics and ayahs hence elaborating and organising your notes. </p>
                      <div className="btn-group">
                         <button className="btn pl-5 pr-5" onClick={this.goToPlainSurahs}><FaEdit/> Surahs</button>
                      </div>
                  </div>
                  <div className="surahs-illustration m-2">
                    <img src={surahspic} alt="" className="notes-pic"/>
                  </div>
                </div>
                <div className="overlay"></div>
            </div>
        )
      }
}

export default withRouter(Welcome);