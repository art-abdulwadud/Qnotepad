import React from 'react';
import { AuthConsumer } from '../AuthContext';

class AyahForm extends React.Component{
    state = {
        ayahNumber: 0,
        content: '',
        error: false
    }
    addNewAyah = (e, userId) => {
        e.preventDefault()
        const ayah = {
            surah_id: this.props.surahId,
            ayah_number: this.state.ayahNumber,
            content: this.state.content,
            dateCreated: Date.now(),
            user: userId
        }
        if(ayah.content){
            this.props.addANewAyah(ayah)
            this.props.closeForm()
        }else{
            this.setState({error: true})
        }
    }
    render(){
        return(
            <AuthConsumer>
                {({user}) => (
                    <>
                    <form className="topics-form ml-2" onSubmit={(e) => this.addNewAyah(e, user.id)}>
                        <p id={this.state.error ? "visible": "hidden"}
                             className="error-mssg p-2 m-2">Enter an Ayah</p>
                        <input type="number"
                        placeholder="Ayah Number"
                        name="title"
                        className="title-input mb-2"
                        onChange={(e) => {this.setState({ayahNumber: e.target.value})}}/><br/>
                        <textarea type="text"
                        placeholder="Ayah Content..."
                        name="content"
                        className="note-text-area"
                        onChange={(e) => {this.setState({content: e.target.value})}}
                        /><br/>
                        <input type="submit" value="Add to Ayahs"/>
                    </form>
                    </>
                )}
            </AuthConsumer>
        )
    }
}

export default AyahForm;