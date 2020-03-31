import React from 'react'
import PropTypes from 'prop-types';
import { AuthConsumer } from '../AuthContext'

class PlainNotesForm extends React.Component{
    state = {
        title: '',
        content: '',
        error: false
    }
    addNewPlainNote = (e, userId) => {
        e.preventDefault()
        const newNote = {
            title: this.state.title,
            content: this.state.content,
            dateCreated: Date.now(),
            userId: userId
        }
        if(userId && newNote.userId && newNote.title){
            this.props.addNewTitle(newNote)
            this.props.closeForm()
        }else{
            this.setState({error: true})
        }
    }
    render(){
        return(
            <AuthConsumer>
                {({user}) => (
                    <div className="m-2 p-2 text-center" >
                        <form className="plain-notes-form" onSubmit={(e) => this.addNewPlainNote(e, user.id)}>
                            <p id={this.state.error ? "visible": "hidden"}
                             className="error-mssg p-2 m-2">Enter a valid Title</p>
                            <input type="text"
                            className="title-input mb-2 p-1"
                            name="title"
                            placeholder="Notes Title"
                            onChange={(e) => {this.setState({title: e.target.value})}}/><br/>
                            <textarea name="content" id="content-input" 
                            placeholder="Notes content"
                            onChange={(e) => {this.setState({content: e.target.value})}}>
                            </textarea><br/>
                            <button type="submit"
                            className="submit-title">Create new notes</button>
                        </form>
                    </div>
                )}
            </AuthConsumer>
        )
    }
}

PlainNotesForm.propTypes = {
    addNewTitle: PropTypes.func.isRequired,
    closeForm: PropTypes.func.isRequired
}

export default PlainNotesForm;