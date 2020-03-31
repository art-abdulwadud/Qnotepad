import React, { Component } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";
import { users } from '../../../../firebase'
import { MdModeEdit } from "react-icons/md";
import SurahNotesModal from '../../modals/SurahNotesModal';

export default class AyahsContent extends Component {
    state = {
        title: '',
        number: '',
        content: '',
        showModal: false
    }
    componentDidMount(){
        const ayahId = this.props.match.params.ayahid
        this.getThisAyah(ayahId)
    }
    getThisAyah = async ayahId =>{
        try {
            this.setState({number: ''})
            this.setState({content: ''})
            this.setState({title: ''})
            const userId = this.props.match.params.user
            const userAyahs = await users.doc(userId).collection('ayahs')
            const allAyahs = await userAyahs.get()
            allAyahs.forEach( ayah => {
                const data = ayah.data().ayah
                if(ayah.id === ayahId){
                    this.setState({number: [...this.state.number, data.ayah_number]})
                    this.setState({title: [...this.state.title, data.ayah_number]})
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
    updateAyahNumber = async newNumber => {
        try {
            const userId = this.props.match.params.user
            const userAyahs = await users.doc(userId).collection('ayahs')
            const ayahId = this.props.match.params.ayahid
            if(newNumber !== ""){
                const ayahToUpdate = await userAyahs.doc(ayahId)
                ayahToUpdate.update({"ayah.ayah_number": newNumber})
            }
        } catch (error) {
            console.error("Error updating ayah number: ", error);
        }
    }
    updateContent = async newContent => {
        try {
            const userId = this.props.match.params.user
            const userAyahs = await users.doc(userId).collection('ayahs')
            const ayahId = this.props.match.params.ayahid
            if(newContent !== ""){
                const ayahToUpdate = await userAyahs.doc(ayahId)
                ayahToUpdate.update({"ayah.content": newContent})
            }
        } catch (error) {
            console.error("Error updating ayah content: ", error);
        }
    }
    closeModal = () => {
        this.setState({showModal: false})
        const ayahId = this.props.match.params.ayahid
        this.getThisAyah(ayahId)
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
                    updateTitle={this.updateAyahNumber}
                    updateContent={this.updateContent}/>
                </div>
                <div className="mt-3">
                    <div className="note-wrapper ml-2 mr-2 p-2" onClick={this.activateModal}>
                        <div className="ml-2 mt-1 editor cursor">
                            <span className="ml-2"><MdModeEdit/></span>
                            <span className="type-name ml-2 text-success">Click to Edit</span>
                        </div>
                        <span className="type-name">Ayah No. {this.state.number}</span>
                        <p className="paragraphs">
                            {this.state.content}
                        </p>
                        <span className="type-name">Ayahs</span>
                    </div>
                </div>
            </div>
        )
    }
}
