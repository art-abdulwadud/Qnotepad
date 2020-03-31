import React, { Component } from 'react';
import { FaSave } from "react-icons/fa";

export default class PlainNotesDetails extends Component {
    state = {
        titleFormActive: false,
        title: '',
        content: ''
    }
    toggleTitleForm = () => {
        this.setState({titleFormActive: !this.state.titleFormActive})
    }
    update = async e => {
        try {
            e.preventDefault()
            const plainNotesId = this.props.plainNotesId
            const newTitle = this.state.title
            if(newTitle !== ""){
                this.props.updateTitle(plainNotesId, newTitle)
            }
        } catch (error) {
            console.error("Error updating plain notes: ", error);
            
        }
    }
    updateContent = async () => {
        const plainNotesId = this.props.plainNotesId
        const newContent = this.state.content
        if(newContent !== ""){
            this.props.updateContent(plainNotesId, newContent)
        }
    }
    saveAndExit = () => {
        this.updateContent()
        this.props.goToNotes()
    }
    render() {
        return (
            <div>
                <form className="m-2" onSubmit={this.update}>
                    <input type="text"
                    className="title-input mb-2 p-1"
                    name="title"
                    placeholder="Notes Title"
                    onChange={(e) => {this.setState({title: e.target.value})}}
                    defaultValue={this.props.title}/><br/>
                    <input type="submit"
                    className="submit-title"
                    value="Save title"
                    onClick={this.toggleTitleForm}/>
                </form>
                <div className="content-wrapper m-2">
                    <textarea name="content" id="content-input" 
                    onChange={(e) => {this.setState({content: e.target.value})}} 
                    defaultValue={this.props.content}></textarea>
                </div>
                <div className="text-right mr-2">
                    <span className="edit mr-2" onClick={this.updateContent}><FaSave/> Save notes</span>
                    <span className="edit" onClick={this.saveAndExit}><FaSave/> Save and Exit</span>
                </div>
            </div>
        )
    }
}
