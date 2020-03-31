import React from 'react';
import { AiFillDelete } from "react-icons/ai";
import {withRouter} from 'react-router-dom';
import { AuthConsumer } from './AuthContext';

class SurahsPreview extends React.Component{
    goToSurah = (userId) => {
        const id = this.props.surahs.id
        const name = this.props.surahs.name
        const number = this.props.surahs.number
        this.props.history.push({
            pathname: `/${userId}/surahs/${id}/${name}`,
            state: {
                name: name,
                number: number
            }
        })
    }
    deleteSurah = async () => {
        const surahId = this.props.surahs.id
        this.props.deleteThisSurah(surahId)
    }
    render(){
        return(
            <AuthConsumer>
                {({user}) => (
                    <>
                    {user.id === this.props.surahs.user ? (
                        <>
                        <div className="ml-2 mt-1 delete cursor" onClick={this.deleteSurah}>
                            <span><AiFillDelete/></span>
                            <span className="type-name ml-2 text-danger">Delete surah</span>
                        </div>
                        <div className="notes-preview-wrapper p-2" onClick={() => this.goToSurah(user.id)}>
                            <h1 className="notes-title">{this.props.surahs.name}</h1>
                        </div>
                        <div className="note-type-wrapper pl-2">
                            <p className="note-type">Surah</p>
                        </div>
                        </>
                    ) : (<span></span>)}
                    </>
                )}
            
            </AuthConsumer>
        )
    }
}


export default withRouter(SurahsPreview);

