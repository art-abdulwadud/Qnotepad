import React from 'react';
import { AuthConsumer } from '../AuthContext';

class SurahTopicsForm extends React.Component{
    state = {
        title: '',
        content: '',
        error: false
    }
    addNewTopic = (e, userId) => {
        e.preventDefault()
        const topic = {
            surah_id: this.props.surahId,
            title: this.state.title,
            content: this.state.content,
            dateCreated: Date.now(),
            user: userId
        }
        if(topic.title){
            this.props.addATopic(topic)
            this.props.closeForm()
        }else{
            this.setState({error: true })
        }
    }
    
    render(){
        return(
            <AuthConsumer>
                {({user}) => (
                     <>
                     <form className="topics-form ml-2" onSubmit={(e) => this.addNewTopic(e, user.id)}>
                         <p id={this.state.error ? "visible": "hidden"}
                              className="error-mssg p-2 m-2">Enter a valid Title</p>
                         <input type="text"
                         placeholder="Topic Title"
                         name="title"
                         className="title-input mb-2"
                         onChange={(e) => {this.setState({title: e.target.value})}}/>
                         <textarea type="text"
                         placeholder="Topic Content..."
                         name="content"
                         className="note-text-area"
                         onChange={(e) => {this.setState({content: e.target.value})}}
                         /><br/>
                         <input type="submit" value="Add to Topics"/>
                     </form>
                     </>
                )}
            </AuthConsumer>
        )
    }
}

export default SurahTopicsForm;