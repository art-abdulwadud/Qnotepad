import React, { Component } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";
import { users } from '../../../../firebase'
import { MdModeEdit } from "react-icons/md";
import SurahNotesModal from '../../modals/SurahNotesModal';

export default class NotesContent extends Component {
    state = {
        title: '',
        content: '',
        showModal: false
    }
    componentDidMount(){
        const notesId = this.props.match.params.notesid
        this.getTheseNotes(notesId)
    }
    getTheseNotes = async notesId =>{
        try {
            this.setState({title: ''})
            this.setState({content: ''})
            const userId = this.props.match.params.user
            const userNotes = await users.doc(userId).collection('surah_notes')
            const allSurahNotes = await userNotes.get()
            allSurahNotes.forEach( surahNotes => {
                const data = surahNotes.data().surahNotes
                if(surahNotes.id === notesId){
                    this.setState({title: [...this.state.title, data.title]})
                    this.setState({content: [...this.state.content, data.content]})
                }
            })
        }catch(error){
            console.error("Error fetching Surah Notes: ", error);
        }
    }
    goBackToNotes = () => {
        const userId = this.props.match.params.user
        const id = this.props.match.params.surahid
        const name = this.props.match.params.name
        const number = this.props.match.params.number
        this.props.history.push({
            pathname: `/${userId}/surahs/${id}/${name}`,
            state: {
                name: name,
                number: number
            }
        })
    }
    activateModal = () => {
        this.setState({showModal: true})
    }
    updateTitle = async newTitle => {
        try {
            const userId = this.props.match.params.user
            const userNotes = await users.doc(userId).collection('surah_notes')
            const notesId = this.props.match.params.notesid
            if(newTitle !== ""){
                const noteToUpdate = await userNotes.doc(notesId)
                noteToUpdate.update({'surahNotes.title': newTitle})
            }
        } catch (error) {
            console.error("Error updating surah notes title: ", error)
        }
    }
    updateContent = async newContent => {
        try {
            const userId = this.props.match.params.user
            const userNotes = await users.doc(userId).collection('surah_notes')
            const notesId = this.props.match.params.notesid
            if(newContent !== ""){
                const noteToUpdate = await userNotes.doc(notesId)
                noteToUpdate.update({ 'surahNotes.content': newContent})
            }
        } catch (error) {
            console.error("Error updating surah notes content: ", error);
        }
    }
    closeModal = () => {
        this.setState({showModal: false})
        const notesId = this.props.match.params.notesid
        this.getTheseNotes(notesId)
    }
    render() {
        return (
            <div>
                <div className="back">
                    <span className="back-arrow ml-2" onClick={this.goBackToNotes}>
                        <IoMdArrowRoundBack/> Back</span>
                </div>
                <div id={this.state.showModal ? "visible": "hidden"}>
                    <SurahNotesModal title={this.state.title} content={this.state.content}
                    closeModal={this.closeModal}
                    updateTitle={this.updateTitle}
                    updateContent={this.updateContent}/>
                </div>
                <div className="mt-3">
                    <div className="note-wrapper ml-2 mr-2 p-2" onClick={this.activateModal}>
                        <div className="ml-2 mt-1 editor cursor">
                            <span className="ml-2"><MdModeEdit/></span>
                            <span className="type-name ml-2 text-success">Click to Edit</span>
                        </div>
                        <h1 className="title">{this.state.title}</h1>
                        <p className="paragraphs">
                            {this.state.content}
                        </p>
                        <span className="type-name">Surah Notes</span>
                    </div>
                </div>
            </div>
        )
    }
}
