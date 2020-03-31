import React from 'react';
import PropTypes from 'prop-types';
import { AiFillDelete } from "react-icons/ai";
import { withRouter } from 'react-router-dom';
import { AuthConsumer } from './AuthContext'

class PlainNotesPreview extends React.Component{
    handleClick = () => {
        const id = this.props.plainNotes.id
        const title = this.props.plainNotes.title
        const userId = this.props.plainNotes.userId
        this.props.history.push({
            pathname: `/${userId}/plain-notes/${id}/${title}`,
            state: {
                title: this.props.plainNotes.title,
                content: this.props.plainNotes.content,
            }
        })
    }
    delete = async () => {
        const plainNotesId = this.props.plainNotes.id
        this.props.deleteNotes(plainNotesId)
    }
    render(){
        return(
            <AuthConsumer>
                {
                    ({user}) => (
                        <>
                        {user.id === this.props.plainNotes.userId ? (
                            <div>
                            <div className="ml-2 mt-1 delete cursor" onClick={this.delete}>
                                <span><AiFillDelete/></span>
                                <span className="type-name ml-2 text-danger">Delete Notes</span>
                            </div>
                            <div>
                                <div className="notes-preview-wrapper p-2" onClick={this.handleClick}>
                                    <h1 className="notes-title">{this.props.plainNotes.title}</h1>
                                    <div className="p-wrapper">
                                        {this.props.plainNotes.content}
                                    </div>
                                </div>
                                <div className="note-type-wrapper pl-2">
                                    <p className="note-type">Plain Notes</p>
                                </div>
                            </div>
                        </div>
                        ) : (<span></span>)}
                        </>
                    )
                }
            </AuthConsumer>
        )
    }
}

PlainNotesPreview.propTypes = {
    plainNotes: PropTypes.object.isRequired
}

export default withRouter(PlainNotesPreview);