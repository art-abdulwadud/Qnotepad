import React, { Component } from 'react';
import SurahsPage from './pages/SurahsPage';
import { users } from '../firebase';


export default class SurahDashboard extends Component {
    state = {
        surahs: [],
        loading: false
      }
      preloader = async (surahDb, surahState) => {
        if(surahDb !== surahState){
          this.setState({loading: true})
        }else{
          this.setState({loading: false})
        }
      }
      getSurahsFromFirebase = async userId => {
        try {
          this.preloader(2,1)
          this.setState({ surahs: []})
          const userId = this.props.match.params.user
          const userSurahs = await users.doc(userId).collection('surahs')
          const surahs = await userSurahs.get()
          surahs.forEach(surah => {
            const data = surah.data().surah
            const surahObj = {
              id: surah.id,
              ...data
            }
            this.setState({ surahs: [...this.state.surahs, surahObj]})
            this.preloader(surahs.docs.length, this.state.surahs.length)
          })

        }catch(error){
          console.error('Error getting data: ', error);
          
        }
      }
      createNewSurah = async surah => {
        try {
          const userId = this.props.match.params.user
          const userSurahs = await users.doc(userId).collection('surahs')
          userSurahs.add({ surah })
          this.getSurahsFromFirebase(userId)
        }catch(error){
          console.error('Error adding file: ', error);
          
        }
      }
      deleteSurah = async surahId => {
        try{
          const userId = this.props.match.params.user
          const userSurahs = await users.doc(userId).collection('surahs')
          const surah = await userSurahs.get()
          if(surah.docs.length !== 0){
              surah.forEach( surah => {
                if(surahId === surah.id){
                  surah.ref.delete()
                  this.getSurahsFromFirebase()
                }
              })
          }
          this.deleteNotes(surahId)
          this.deleteAyahs(surahId)
          this.deleteTopics(surahId)
        }catch(error){
          console.error("Error deleting surah: ", error);
        }
      }
      
      deleteNotes = async surahId => {
        const userId = this.props.match.params.user
        const userSurahs = await users.doc(userId).collection('surah_notes')
        const notes = await userSurahs.get()
        if(notes.docs.length !== 0){
            notes.forEach( surahNotes => {
                const data = surahNotes.data().surahNotes
                if(data.surahId === surahId){
                    surahNotes.ref.delete()
                }
            })
        }
      }
      deleteAyahs = async surahId => {
        const userId = this.props.match.params.user
        const userAyahs = await users.doc(userId).collection('ayahs')
        const allAyahs = await userAyahs.get()
        if(allAyahs.docs.length !== 0){
          allAyahs.forEach( surahAyahs => {
              const data = surahAyahs.data().ayah
              if(data.surah_id === surahId){
                surahAyahs.ref.delete()
            }
          })
        }
      }
      deleteTopics = async surahId => {
        const userId = this.props.match.params.user
        const userTopics = await users.doc(userId).collection('topics')
        const allTopics = await userTopics.get()
        if(allTopics.docs.length !== 0){
          allTopics.forEach( surahTopics => {
              const data = surahTopics.data().topic
              if(data.surah_id === surahId){
                surahTopics.ref.delete()
              }
          })
        }
      }
    render() {
        return (
          <>
            <div className="modal pre-loader-wrapper" id={this.state.loading ? "visible":"hidden"}>
              <div className="pre-loader-content center-wrapper">
                <div className="pre-loader"></div>
              </div>
            </div>
            <div id={this.state.loading ? "hidden":"visible"}>
                <SurahsPage 
                surahs={this.state.surahs}
                createNewSurah={this.createNewSurah}
                deleteSurah={this.deleteSurah}
                userId={this.props.match.params.user}
                getAllSurahs={this.getSurahsFromFirebase}
                />
            </div>
          </>
        )
    }
}
