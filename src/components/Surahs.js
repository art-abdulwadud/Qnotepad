import React from 'react';
import SurahNotes from './surahfiles/SurahNotes';
import Topics from './surahfiles/Topics';
import Ayahs from './surahfiles/Ayahs';
import SurahNav from './surahfiles/SurahNav';

class Surahs extends React.Component{
    state = {
        nav: 'notes',
        notesNumber: 0,
        topicsNumber: 0,
        ayahsNumber: 0
    }
    goToNotes = () => {
        this.setState({nav: 'notes'})
    }
    goToTopics = () => {
        this.setState({nav: 'topics'})
    }
    goToAyahs = () => {
        this.setState({nav: 'ayahs'})
    }
    numberOfNotes = number => {
        const newNumber = number
        this.setState({notesNumber: newNumber})
    }
    numberOfTopics = number => {
        const newNumber = number
        this.setState({topicsNumber: newNumber})
    }
    numberOfAyahs = number => {
        const newNumber = number
        this.setState({ayahsNumber: newNumber})
    }
    goToThisContent = (notesId) => {
        const userId = this.props.match.params.user
        const surahId = this.props.match.params.id
        const name = this.props.history.location.state.name
        const number = this.props.history.location.state.name
        this.props.history.push({
            pathname: `/${userId}/surah-notes/${notesId}/${surahId}/${name}/${number}`
        })
    }
    goToAyah = ayahId => {
        const userId = this.props.match.params.user
        const surahId = this.props.match.params.id
        const name = this.props.history.location.state.name
        const number = this.props.history.location.state.name
        this.props.history.push({
            pathname: `/${userId}/ayah/${ayahId}/${surahId}/${name}/${number}`
        })
    }
    goToTopic = topicId => {
        const userId = this.props.match.params.user
        const surahId = this.props.match.params.id
        const name = this.props.history.location.state.name
        const number = this.props.history.location.state.name
        this.props.history.push({
            pathname: `/${userId}/topic/${topicId}/${surahId}/${name}/${number}`
        })
    }
    render(){
        return(
            <>
            <div>
                <div className='surah-name-wrapper'>
                <span className="float-right note-type greyish mr-2">Surah No. {this.props.history.location.state.number}</span>
                <h1 className='page-title m-2'>{this.props.history.location.state.name}</h1>
                </div>
            </div>
            <SurahNav nav={this.state.nav} goToAyahs={this.goToAyahs} goToNotes={this.goToNotes}
            goToTopics={this.goToTopics} notesNumber={this.state.notesNumber} 
            topicsNumber={this.state.topicsNumber} ayahsNumber={this.state.ayahsNumber}/>

            <div id={this.state.nav === 'notes'? 'visible': 'hidden'}>
                <SurahNotes surahId={this.props.match.params.id}
                    userId={this.props.match.params.user}
                    numberOfNotes={this.numberOfNotes}
                    goToThisContent={this.goToThisContent}/>
            </div>

            <div  id={this.state.nav === 'topics'? 'visible': 'hidden'}>
                <Topics surahId={this.props.match.params.id}
                    userId={this.props.match.params.user}
                    numberOfTopics={this.numberOfTopics}
                    goToTopic={this.goToTopic}/>
            </div>
            <div id={this.state.nav === 'ayahs'? 'visible': 'hidden'}>
                <Ayahs surahId={this.props.match.params.id}
                    userId={this.props.match.params.user}
                    numberOfAyahs={this.numberOfAyahs}
                    goToAyah={this.goToAyah}/>
            </div>
            </>
        )
    }
}

export default Surahs;