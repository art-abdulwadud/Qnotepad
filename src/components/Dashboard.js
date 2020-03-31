import React, { Component } from 'react'
import PlainNotesPage from './pages/PlainNotesPage';
import { users } from '../firebase';

export default class Dashboard extends Component {
    state = {
        plainNotes: []
    }
    componentDidMount(){
        this.getPlainNotes(this.props.match.params.user)
    }
    getPlainNotes = async userId => {
      try {
        this.setState({plainNotes: []})
        const userNotes = await users.doc(userId).collection('plain_notes')
        const pnotes = await userNotes.get()
        pnotes.forEach(note => {
          const data = note.data().note
          const notesObj = {
              id: note.id,
              ...data
          }
          this.setState({plainNotes: [...this.state.plainNotes, notesObj]})
        })
      }catch(error){
        console.error("Error getting data: ", error);
      }
    }
    createNewTitle = async note => {
      try {
        const userId = this.props.match.params.user
        const pnotes = await users.doc(userId)
        const pnotesCollection = await pnotes.collection('plain_notes').add({ note })
        const pnotesObj = {
          id: pnotesCollection.id,
          ...note
        }
        this.setState({plainNotes: [...this.state.plainNotes, pnotesObj]})
        this.getPlainNotes(this.props.match.params.user)
      }catch(error){
        console.error("Error adding data: ", error);
      }
    }
    sortDate = (a, b) => {
      return new Date(b.dateCreated) - new Date(a.dateCreated);
    }
    deleteThisNote = async plainNotesId => {
      try {
        const userId = this.props.match.params.user
        const userNotes = await users.doc(userId).collection('plain_notes')
        const allPlainNotes = await userNotes.get()
        allPlainNotes.forEach(plainNote => {
          if(plainNote.id === plainNotesId){
            plainNote.ref.delete()
            this.getPlainNotes(userId)
          }
        })
      } catch (error) {
        console.error("Error deleting this p-note: ", error);
        
      }
    }
    render() {
      const sortedNotes = this.state.plainNotes
      sortedNotes.sort(this.sortDate)
        return (
            <>
                <PlainNotesPage
              plainNotes={this.state.plainNotes}
              createNewTitle={this.createNewTitle}
              createNewANote={this.createNewTitle}
              deleteThisNote={this.deleteThisNote}/>
            </>
        )
    }
}
