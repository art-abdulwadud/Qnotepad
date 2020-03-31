import React, { Component } from 'react'

export default class SearchAndSort extends Component {
    state = {
        search: ''
    }

    searchContent = (e) => {
        e.preventDefault()
        console.log(this.state.search);
    }
    render() {
        return (
            <div>
                <form className="form-inline my-2 my-lg-0" onSubmit={this.searchContent}>
                    <input className="form-control mr-sm-2" 
                    type="search" 
                    placeholder="Search" 
                    aria-label="Search"
                    onChange={(e) => {this.setState({search: e.target.value})}}/>
                    <input type="submit" value="Search"/>
                </form>
            </div>
        )
    }
}
