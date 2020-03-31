import React from 'react';
import PlainNotesForm from '../forms/PlainNotesForm';
import PlainNotesPreview from '../PlainNotesPreview';
import { IoIosAddCircleOutline } from "react-icons/io";
import PropTypes from 'prop-types';
import SearchAndSort from '../SearchAndSort';
import { AuthConsumer } from '../AuthContext';

class PlainNotesPage extends React.Component{
    state = {
        noteFormActive: false
    }
    toggleNoteForm = () => {
        this.setState({ noteFormActive: !this.state.noteFormActive})
    }
    addNewTitle = (note) => {
        this.props.createNewTitle(note)
    }
    deleteNotes = async plainNotesId => {
        this.props.deleteThisNote(plainNotesId)
    }
    render(){
        return(
            <AuthConsumer>
                {({user}) => (
                    <>
                    {user.id ? (
                    <div className="pnw-container">
                        <SearchAndSort/>
                        <div className="add-wrapper m-2">
                            <span className="add mr-3"
                            onClick={this.toggleNoteForm}><IoIosAddCircleOutline/>
                            {this.state.noteFormActive ? "cancel": "add notes"}</span>
                        </div>
                        <div id={this.state.noteFormActive ? "visible" : "hidden"}>
                            <PlainNotesForm addNewTitle={this.addNewTitle}
                                closeForm={this.toggleNoteForm}/>
                        </div>
                        <div className="notes-preview">
                            {
                                Object.keys(this.props.plainNotes).map(key => (
                                    <div className="plain-notes-grid m-2"
                                    key={key}>
                                        <PlainNotesPreview plainNotes={this.props.plainNotes[key]}
                                        deleteNotes={this.deleteNotes}/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    ) : (<span></span>)}
                    
                    </>
                )}
            </AuthConsumer>
        )
    }
}

PlainNotesPage.propTypes = {
    plainNotes: PropTypes.array.isRequired,
    createNewTitle: PropTypes.func.isRequired
}

export default PlainNotesPage;