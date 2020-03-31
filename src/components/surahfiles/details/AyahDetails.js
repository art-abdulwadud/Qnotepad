import React, { Component } from 'react';
import { AiFillDelete } from "react-icons/ai";


export default class AyahDetails extends Component {
    delete = async () => {
        const ayahId = this.props.ayahs.id
        this.props.deleteAyah(ayahId)
    }
    goToContent = () => {
        const ayahId = this.props.ayahs.id
        this.props.goToContent(ayahId)
    }
    render() {
        return (
            <div>
                <div className="delete ml-2 mt-1 cursor" onClick={this.delete}>
                    <span><AiFillDelete/></span>
                    <span className="type-name ml-2 mr-2 text-danger">Delete ayah</span>
                </div>
                <div className="note-wrapper ml-2 mr-2 p-2" onClick={this.goToContent}>
                    <span className="type-name float-right">Ayah No.{this.props.ayahs.ayah_number}</span>
                    <div className="p-wrapper">{this.props.ayahs.content}</div>
                    <span className="type-name">Ayahs</span>
                </div>
            </div>
        )
    }
}
