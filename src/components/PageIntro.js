import React from 'react';
import '../components/css/Welcome.css';
import backgroundVideo from './videos/vbg1.mp4';
import { FaEdit } from "react-icons/fa";

class PageIntro extends React.Component {
    render(){
        return(
            <div className="welcome-grid-wrapper">
                <div className="video-wrapper">
                    <video className='video' autoPlay loop muted>
                        <source src={backgroundVideo} type='video/mp4' />
                    </video>
                </div>
                <div className="text-wrapper page-intro text-center">
                    <h1 className="intro-heading">{this.props.title}</h1>
                    <p className="intro-text m-2">{this.props.paragraph}</p>
                    <div className="btn-group">
                        <button className="btn pl-5 pr-5 mr-2"><FaEdit/> Plain Notes</button>
                        <button className="btn pl-5 pr-5"><FaEdit/> Surahs</button>
                    </div>
                </div>
                <div className="overlay"></div>
            </div>
        )
    }
}

export default PageIntro;