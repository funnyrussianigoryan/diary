import React from 'react'
import './styleHeaderAdd.css'
import {connect} from 'react-redux'
import {addEvent} from '../Action/action.js'

class HeaderAdd extends React.Component {

    state = {
        context: false,
        day: null,
        month: null,
        year: null,
        event: '',
        description: '',
        time: ''
    }

    open = () => {
        this.setState({
            context: true,
        })
    }

    close = () => {
        this.setState({
            context: false
        })
    }

    inputDate = (e) => {
        const date = e.target.value.split('-');
        const day = Number(date[2]);
        const month =  Number(date[1]);
        const year = Number(date[0]);
        this.setState({day, month, year})
    }

    inputEvent = (e) => {
        this.setState({
            event: e.target.value
        })
    }

    inputDescription = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    inputTime = (e) => {
        this.setState({
            time: e.target.value
        })
    }

    submitEvent = (e) => {
        const {event, description, day, month, year, time} = this.state;
        if (!event || !day) return
        const id = `${day}.${month - 1}.${year}`;
        const {dispatch} = this.props;
        dispatch(addEvent(
            time,
            event,
            description,
            id
        ))
        this.setState({
            day: null,
            month: null,
            year: null,
            event: '',
            description: ''
        })
        this.close();
    }

    render() {
        const context = () => {
            return (
                <div className='context'>
                        <label>
                            Date
                            <input className='date' type='date' placeholder='Day' onChange={this.inputDate}/>
                        </label>
                        <label>
                            Time
                            <input className='date' type='time' placeholder='Time' onChange={this.inputTime}/>
                        </label>
                        <label>
                            Event
                            <input type='text' placeholder='Event' value={this.state.event} onChange={this.inputEvent}/>
                        </label>
                        <label>
                            Description
                            <input type='textarea' placeholder='Description' value={this.state.description} onChange={this.inputDescription} />
                        </label>
                    <div className='button' onClick={this.submitEvent}>Add event</div>
                    <div className='button' onClick={this.close}>Close</div>
                </div>
            )
        }

        return (
                
                <div className='styleHeaderAdd'>
                    <div className='button' onClick={this.open}>Add new event</div>
                    {this.state.context && context()}
                </div>
        )
    }
}

export default connect()(HeaderAdd);