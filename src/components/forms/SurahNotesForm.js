import React from 'react';
import { AuthConsumer } from '../AuthContext';

class SurahNotesForm extends React.Component{
    state = {
        title: '',
        content: '',
        error: false
    }
    addANote = (e, userId) => {
        e.preventDefault()
        const surahNotes = {
            surahId: this.props.surahId,
            title: this.state.title,
            content: this.state.content,
            dateCreated: Date.now(),
            user: userId
        }
        if(surahNotes.title){
            this.props.addSurahNotes(surahNotes)
            this.props.closeForm()
        }else{
            this.setState({error: true})
        }
    }
    render(){
        return(
            <AuthConsumer>
                {({user}) => (
                    <>
                    <form className="notes-form m-2" onSubmit={(e) => this.addANote(e, user.id)}>
                        <p id={this.state.error ? "visible": "hidden"}
                         className="error-mssg p-2 m-2">Enter a valid Title</p>
                        <input type="text" name="title" className="title-input mb-2" 
                        placeholder="Notes title" 
                        onChange={(e) => {this.setState({title: e.target.value})}}/>
                        <textarea name="note" 
                        className="note-text-area" 
                        placeholder="Notes content..." 
                        onChange={(e) => {this.setState({content: e.target.value})}}/><br/>
                        <input type="submit" value="Add to notes"/>
                    </form>
                </>
                )}
            </AuthConsumer>
        )
    }
}

export default SurahNotesForm;