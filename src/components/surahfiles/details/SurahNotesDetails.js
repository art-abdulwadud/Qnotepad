import React, { Component } from 'react';
import { AiFillDelete } from "react-icons/ai";

export default class SurahNotesDetails extends Component {
    delete = async () => {
        const notesId = this.props.surahNotes.id
        this.props.deleteNotes(notesId)
    }
    goToContent = () => {
        const notesId = this.props.surahNotes.id
        this.props.goToContent(notesId)
    }
    render() {
        return (
            <div>
                <div className="ml-2 mt-1 delete cursor" onClick={this.delete}>
                    <span><AiFillDelete/></span>
                    <span className="type-name ml-2 text-danger">Delete notes</span>
                </div>
                <div>
                <div className="note-wrapper ml-2 mr-2 p-2" onClick={this.goToContent}>
                    <h1 className="title">{this.props.surahNotes.title}</h1>
                    <div className="p-wrapper">
                        {this.props.surahNotes.content}
                    </div>
                    <span className="type-name">Surah Notes</span>
                </div>
                </div>
            </div>
        )
    }
}
