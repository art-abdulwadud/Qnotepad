import React from 'react';
import { withRouter } from 'react-router-dom';
import { users } from '../firebase';
import PlainNotesDetails from './PlainNotesDetails';

class PlainNotes extends React.Component{
    state = {
        title: '',
        content: '',
    }
    componentDidMount(){
        this.getPlainNotes(this.props.match.params.user)
    }
    getPlainNotes = async userId => {
        try {
          this.setState({plainNotes: []})
          const notes = await users.doc(userId).collection('plain_notes')
          const pnotes = await notes.get()
          pnotes.forEach(note => {
            const data = note.data().note
            const notesObj = {
                id: note.id,
                ...data
            }
            if(notesObj.id === this.props.match.params.id){
                this.setState({title: notesObj.title})
                this.setState({content: notesObj.content})
            }
        })
        }catch(error){
          console.error("Error getting data: ", error);
        }
      }
    changeTitle = (e) => {
        e.preventDefault()
        this.setState({titleFormActive: false})
        
    }
    goToNotes = () => {
        const userId = this.props.match.params.user
        this.props.history.push({
            pathname: `/${userId}/plain-notes`
        })
    }
    updateTitle = async (plainNotesId, newTitle)  => {
        try {
            const userId = this.props.match.params.user
            const usersCollection = await users.doc(userId).collection('plain_notes')
            const noteToUpdate = await usersCollection.doc(plainNotesId)
            noteToUpdate.update({ 'note.title': newTitle })
        } catch (error) {
            console.error("Error updating title: ", error);
        }
    }
    updateContent = async (plainNotesId, newContent) => {
        try {
            const userId = this.props.match.params.user
            const usersCollection = await users.doc(userId).collection('plain_notes')
            const noteToUpdate = await usersCollection.doc(plainNotesId)
            noteToUpdate.update({ 'note.content': newContent })
        } catch (error) {
            console.error("Error updating content: ", error);
        }
    }
    render(){
        return(
            <>  
               <PlainNotesDetails title={this.state.title} content={this.state.content}
               plainNotesId={this.props.match.params.id}
               updateTitle={this.updateTitle}
               updateContent={this.updateContent}
               goToNotes={this.goToNotes} />
            </>
        )
    }
}

export default withRouter(PlainNotes);