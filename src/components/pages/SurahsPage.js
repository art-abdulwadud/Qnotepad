import React from 'react';
import SurahsForm from '../forms/SurahsForm';
import SurahsPreview from '../SurahsPreview';
import { IoIosAddCircleOutline } from "react-icons/io";
import SearchAndSort from '../SearchAndSort';

class SurahsPage extends React.Component{
    state = {
        surahFormActive: false
    }
    componentDidMount(){
        this.props.getAllSurahs(this.props.userId)
    }
    toggleSurahForm = () => {
        this.setState({surahFormActive: !this.state.surahFormActive})
    }
    addNewSurah = surah => {
        this.props.createNewSurah(surah)
    }
    sortDate = (a, b) => {
        return new Date(b.dateCreated) - new Date(a.dateCreated);
    }
    deleteThisSurah = async surahId => {
        this.props.deleteSurah(surahId)
    }
    render(){
        const sortedSurahs = this.props.surahs
        sortedSurahs.sort(this.sortDate)
        return(
            <div className="pnw-container">
                <div className="add-wrapper m-2">
                    <SearchAndSort />
                    <span className="add mr-3"
                    onClick={this.toggleSurahForm}><IoIosAddCircleOutline/>
                    {this.state.surahFormActive ? "cancel": "add surah"}</span>
                </div>
                <div id={this.state.surahFormActive ? "visible" : "hidden"}>
                    <SurahsForm addNewSurah={this.addNewSurah}
                        closeForm={this.toggleSurahForm}/>
                </div>
                <div className="notes-preview">
                    {
                        Object.keys(sortedSurahs).map(key => (
                            <div className="plain-notes-grid m-2"
                            key={key}>
                                <div>
                                <SurahsPreview surahs={this.props.surahs[key]}
                                deleteThisSurah={this.deleteThisSurah}/>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}


export default SurahsPage;