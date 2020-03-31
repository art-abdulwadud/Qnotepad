import React, { Component } from 'react';
import { AiFillDelete } from "react-icons/ai";

export default class TopicsDetails extends Component {
    delete = async () => {
        const topicId = this.props.topics.id
        this.props.deleteTopic(topicId)
    }
    goToContent = () => {
        const topicId = this.props.topics.id
        this.props.goToContent(topicId)
    }
    render() {
        return (
            <div>
                <div className="delete ml-2 mt-1 cursor" onClick={this.delete}>
                    <span><AiFillDelete/></span>
                    <span className="type-name ml-2 mr-2 text-danger">Delete topic</span>
                </div>
                <div className="note-wrapper ml-2 mr-2 p-2" onClick={this.goToContent}>
                    <h1 className="title">{this.props.topics.title}</h1>
                    <div className="p-wrapper">{this.props.topics.content}</div>
                    <span className="type-name">Topics</span>
                </div>
            </div>
        )
    }
}
