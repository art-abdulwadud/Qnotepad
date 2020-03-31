import React, { Component } from 'react'
import SurahTopicsForm from '../forms/SurahTopicsForm';
import { IoIosAddCircleOutline } from "react-icons/io";
import { users } from '../../firebase';
import TopicsDetails from './details/TopicsDetails';

export default class Topics extends Component {
    state = {
        topics: [],
        topicFormActive: false
    }
    componentDidMount(){
        this.getAlltopics(this.props.surahId)
    }
    numberOfTopics = () => {
        this.props.numberOfTopics(this.state.topics.length)
    }
    getAlltopics = async surahId => {
        this.setState({topics: []})
        const userId = this.props.userId
        const userTopics = await users.doc(userId).collection('topics')
        const allTopics = await userTopics.get()
        allTopics.forEach(topic => {
            const data = topic.data().topic
            const topicObj = {
                id: topic.id,
                ...data
            }
            if(data.surah_id === this.props.surahId){
                this.setState({topics: [...this.state.topics, topicObj]})
                this.numberOfTopics()
            }
        })
    }
    addATopic = async topic => {
        const userId = this.props.userId
        const userTopics = await users.doc(userId).collection('topics')
        const topicsAdd = await userTopics.add({ topic })
        const topicObj = {
            id: topicsAdd.id,
            ...topic
        }
        this.setState({topics: [...this.state.topics, topicObj]})
        this.numberOfTopics()
    }
    toggleTopicForm = () => {
        this.setState({topicFormActive: !this.state.topicFormActive})
    }
    sortDate = (a, b) => {
        return new Date(b.dateCreated) - new Date(a.dateCreated);
    }
    deleteTopic = async topicId => {
        try {
            const userId = this.props.userId
            const userTopics = await users.doc(userId).collection('topics')
            const allTopics = await userTopics.get()
            allTopics.forEach(topic => {
                if(topic.id === topicId){
                    topic.ref.delete()
                    this.getAlltopics(this.props.surahId)
                    this.numberOfTopics()
                }
            })
        } catch (error) {
            console.error("Error deleting topic: ", error);
            
        }
    }
    goToContent = topicId => {
        this.props.goToTopic(topicId)
    }
    render() {
        const sortedTopics = this.state.topics
        sortedTopics.sort(this.sortDate)
        return (
            <div>
                <div className="add-wrapper m-2">
                    <span className="add mr-3" 
                    onClick={this.toggleTopicForm}><IoIosAddCircleOutline />
                    {this.state.topicFormActive ? "cancel": "topic"}</span>
                </div>
                <div id={this.state.topicFormActive ? "visible": "hidden"}>
                    <SurahTopicsForm addATopic={this.addATopic}
                    closeForm={this.toggleTopicForm}
                    surahId={this.props.surahId}/>
                </div>
                <div className="notes-sec-grid">
                    
                {
                        Object.keys(sortedTopics).map(key => (
                            <div key={key}>
                                <TopicsDetails topics={sortedTopics[key]}
                                    deleteTopic={this.deleteTopic}
                                    goToContent={this.goToContent}/>
                            </div>
                        ))
                    }

                </div>
            </div>
        )
    }
}
