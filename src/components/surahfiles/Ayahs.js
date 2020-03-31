import React, { Component } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import AyahForm from '../forms/AyahForm';
import { users } from '../../firebase';
import AyahDetails from './details/AyahDetails';

export default class Ayahs extends Component {
    state = {
        ayahFormActive: false, 
        ayahs: []
    }
    componentDidMount(){
        this.getAllAyahs(this.props.surahId)
    }
    getAllAyahs = async surahId => {
        this.setState({ayahs: []})
        const userId = this.props.userId
        const userAyahs = await users.doc(userId).collection('ayahs')
        const getAyahs = await userAyahs.get()
        getAyahs.forEach(ayahs => {
            const data = ayahs.data().ayah
            const ayahObj = {
                id: ayahs.id,
                ...data
            }
            if(data.surah_id === this.props.surahId){
                this.setState({ayahs: [...this.state.ayahs, ayahObj]})
                this.numberOfAyahs()
            }
        })
    }
    addANewAyah = async ayah => {
        try {
            const userId = this.props.userId
            const userAyahs = await users.doc(userId).collection('ayahs')
            const ayahsAdd = await userAyahs.add({ ayah })
            const ayahObj = {
                id: ayahsAdd.id,
                ...ayah
            }
            this.setState({ayahs: [...this.state.ayahs, ayahObj]})
            this.numberOfAyahs()
        }catch(error){
            console.error("Error adding ayah: ", error);
        }
    }
    numberOfAyahs = () => {
        this.props.numberOfAyahs(this.state.ayahs.length)
    }
    toggleAyahForm = () => {
        this.setState({ayahFormActive: !this.state.ayahFormActive})
    }
    sortDate = (a, b) => {
        return new Date(b.dateCreated) - new Date(a.dateCreated);
    }
    deleteAyah = async ayahId => {
        try {
            const userId = this.props.userId
            const userAyahs = await users.doc(userId).collection('ayahs')
            const allAyahs = await userAyahs.get()
            if(allAyahs.docs.length !== 0){
                allAyahs.forEach( ayah => {
                    if(ayah.id === ayahId){
                        ayah.ref.delete()
                        this.getAllAyahs(this.props.ayahId)
                        this.numberOfAyahs()
                    }
                })
            }
        } catch (error) {
            console.error("Error deleting ayah: ", error);
        }
    }
    goToContent = ayahId => {
        this.props.goToAyah(ayahId)
    }
    render() {
        const sortedAyahs = this.state.ayahs
        sortedAyahs.sort(this.sortDate)
        return (
            <div>
                <div className="add-wrapper m-2">
                    <span className="add" 
                    onClick={this.toggleAyahForm}><IoIosAddCircleOutline />
                    {this.state.ayahFormActive ? "cancel": "ayah"}</span>
                </div>
                <div id={this.state.ayahFormActive ? "visible": "hidden"}>
                    <AyahForm closeForm={this.toggleAyahForm}
                    surahId={this.props.surahId}
                    addANewAyah={this.addANewAyah}/>
                </div>
                <div className="notes-sec-grid">
                    
                    {
                        Object.keys(sortedAyahs).map(key => (
                            <div  key={key}>
                                <AyahDetails ayahs={sortedAyahs[key]}
                                    deleteAyah={this.deleteAyah}
                                    goToContent={this.goToContent}/>
                            </div>
                        ))
                    }

                </div>
            </div>
        )
    }
}
