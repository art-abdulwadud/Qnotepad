import React, { Component } from 'react'

export default class SurahNav extends Component {
    goToNotes = () => {
        this.props.goToNotes()
    }
    goToTopics = () => {
        this.props.goToTopics()
    }
    goToAyahs = () => {
        this.props.goToAyahs()
    }
    render() {
        return (
            <div className="surah-nav">
                <ul className="surah-nav-list">
                    <li className="surah-nav-item mr-2"
                    onClick={this.goToNotes}
                    id={this.props.nav === 'notes'? 'item-active': ''}>
                        Notes (<span>{this.props.notesNumber}</span>)</li>
                    <li className="surah-nav-item mr-2"
                    onClick={this.goToTopics}
                    id={this.props.nav === 'topics'? 'item-active': ''}>
                        Topics (<span>{this.props.topicsNumber}</span>)</li>
                    <li className="surah-nav-item"
                    onClick={this.goToAyahs}
                    id={this.props.nav === 'ayahs'? 'item-active': ''}>
                        Ayahs (<span>{this.props.ayahsNumber}</span>)</li>
                </ul>
            </div>
        )
    }
}
