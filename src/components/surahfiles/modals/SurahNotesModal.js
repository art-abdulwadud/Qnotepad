import React, { Component } from 'react';
import { AiFillCloseSquare } from "react-icons/ai";

export default class SurahNotesModal extends Component {
    state = {
        title: '',
        content: ''
    }
    closeModal = () => {
        this.props.closeModal()
    }
    update = async e => {
        e.preventDefault()
        const newTitle = this.state.title
        const newContent = this.state.content
        this.props.updateTitle(newTitle)
        this.props.updateContent(newContent)
    }
    handleTitleChange = e => {
        if(e.target.value !== ""){
            this.setState({ title: e.target.value})
        }
    }
    handleContentChange = e => {
        if(e.target.value !== ""){
            this.setState({content: e.target.value})
        }
    }
    render() {
        return (
            <div className='modal text-white'>
                <div className="modal-content ml-2 p-2">
                    <div>
                        <span className="float-right close" onClick={this.closeModal}>
                            <AiFillCloseSquare/>
                        </span>
                    </div>
                    <form className="notes-form m-2" onSubmit={this.update}>
                        <p id={this.state.error ? "visible": "hidden"}
                         className="error-mssg p-2 m-2">Enter a valid Title</p>
                        <input type="text" name="title" className="title-input mb-2"
                        onChange={this.handleTitleChange}
                        defaultValue={this.props.title}/>
                        <textarea name="note" 
                        className="content-input" 
                        placeholder="Notes content..." 
                        onChange={this.handleContentChange}
                        defaultValue={this.props.content}/><br/>
                        <input type="submit" value="Save"/>
                    </form>
                </div>
            </div>
        )
    }
}
