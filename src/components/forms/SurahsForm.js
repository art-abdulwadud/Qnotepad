import React from 'react'
import { AuthConsumer } from '../AuthContext'

class SurahsForm extends React.Component{
    state = {
        name: '', 
        number: 0,
        error: false
    }
    addSurah = (e, userId) => {
        e.preventDefault()
        const surah = {
            number: this.state.number,
            name: this.state.name,
            dateCreated: Date.now(),
            user: userId
        }
        if(surah.name){
            this.props.addNewSurah(surah)
            this.props.closeForm()
        }else{
            this.setState({ error: true })
        }
    }
    render(){
        return(
            <AuthConsumer>
            {({user}) => (
                <div className="m-2 p-2 text-center">
                    <form className="plain-notes-form" onSubmit={(e) => this.addSurah(e, user.id)}>
                        <p id={this.state.error ? "visible": "hidden"}
                         className="error-mssg p-2 m-2">Enter a valid Surah name</p>
                        <input type="text"
                        className="title-input mb-2 p-1"
                        name="title"
                        placeholder="Surah name"
                        onChange={(e) => {this.setState({name: e.target.value})}}/><br/>
                        <input type="number"
                        className="title-input mb-2 p-1"
                        name="title"
                        placeholder="Surah number"
                        onChange={(e) => {this.setState({number: e.target.value})}}/><br/>
                        <input type="submit"
                        className="submit-title"
                        value="Add Surah"/>
                    </form>
                </div>
            )}
            </AuthConsumer>
        )
    }
}

export default SurahsForm;