import React, { Component } from 'react';
import { users } from '../../firebase';
import { IoIosAddCircleOutline } from "react-icons/io";
import SurahNotesForm from '../forms/SurahNotesForm';
import SurahNotesDetails from './details/SurahNotesDetails';

export default class SurahNotes extends Component {
    state = {
        surahNotes: [],
        noteFormActive: false
    }
    componentDidMount(){
        this.getAllSurahNotes(this.props.surahId)
    }
    numberOfNotes = () => {
        this.props.numberOfNotes(this.state.surahNotes.length)
    }
    getAllSurahNotes = async surahId =>{
        try {
            this.setState({surahNotes: []})
            const userId = this.props.userId
            const userSurahs = await users.doc(userId).collection('surah_notes')
            const allSurahNotes = await userSurahs.get()
            allSurahNotes.forEach( surahNotes => {
                const data = surahNotes.data().surahNotes
                const allSurahNotesObj = {
                    id: surahNotes.id,
                    ...data
                }
                if(data.surahId === this.props.surahId){
                    this.setState({ surahNotes: [...this.state.surahNotes, allSurahNotesObj]})
                    this.numberOfNotes()
                }
            })
        }catch(error){
            console.error("Error fetching Surah Notes: ", error);
        }
    }
    addSurahNotes = async surahNotes => {
        try {
            const userId = this.props.userId
            const userSurahs = await users.doc(userId).collection('surah_notes')
            const surahNotesAdd = await userSurahs.add({ surahNotes })
            const surahNotesObj = {
                id: surahNotesAdd.id,
                ...surahNotes
            }
            this.setState({surahNotes: [...this.state.surahNotes, surahNotesObj]})
            this.numberOfNotes()
        }catch(error){
            console.error("Error adding Surah Notes: ", error);
        }
    }
    toggleNoteForm = () => {
        this.setState({noteFormActive: !this.state.noteFormActive})
    }
    sortDate = (a, b) => {
        return new Date(b.dateCreated) - new Date(a.dateCreated);
    }
    deleteNotes = async notesId => {
        try {
            const userId = this.props.userId
            const userSurahs = await users.doc(userId).collection('surah_notes')
            const notes = await userSurahs.get()
            if(notes.docs.length !== 0){
                notes.forEach( surahNotes => {
                    if(surahNotes.id === notesId){
                        surahNotes.ref.delete()
                        this.getAllSurahNotes(this.props.surahId)
                        this.numberOfNotes()
                    }
                })
            }
        } catch (error) {
            console.error("Error deleting all notes: ", error)
        }
    }
    goToContent = (notesId) => {
        this.props.goToThisContent(notesId)
    }
    render() {
        const sortedSurahNotes = this.state.surahNotes
        sortedSurahNotes.sort(this.sortDate)
        return (
            <div>
                <div className="add-wrapper m-2">
                    <span className="add mr-3"
                    onClick={this.toggleNoteForm}><IoIosAddCircleOutline/>
                    {this.state.noteFormActive ? "cancel": "notes"}</span>
                </div>
                <div id={this.state.noteFormActive ? "visible": "hidden"}>
                    <SurahNotesForm closeForm={this.toggleNoteForm}
                    surahId={this.props.surahId}
                    addSurahNotes={this.addSurahNotes}/>
                </div>
                <div className="notes-sec-grid">
                    {
                            Object.keys(sortedSurahNotes).map(key => (
                                <div key={key}>
                                    
                                    <div onClick={() => {this.setState({showModal: true})}}>
                                        <SurahNotesDetails surahNotes={this.state.surahNotes[key]}
                                            deleteNotes={this.deleteNotes}
                                            goToContent={this.goToContent} />
                                    </div>
                                </div>
                            ))
                        }
                </div>
            </div>
        )
    }
}
