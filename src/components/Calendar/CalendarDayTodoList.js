import React from 'react'
import './styleCalendarDayTodoList.css'
import EventData from './EventData.js'
import {connect} from 'react-redux'
import {closeContext, addEvent} from '../Action/action.js'

const mapStateToProps = (state) => {
    const props = {
        contextIsOpen: state.context[0],
        activeId: state.context[1],
        events: state.events,
    }
    return props;
}


class CalendarDayTodoList extends React.Component {

    state = {
        newEvent: '',
        newDescription: '',
        newTime: '',
        formIsOpen: false,
        events: null
    }

    close = (e) => {
        if (e.target.id !== 'background' && e.target.id !== 'closeContext') return
        const {dispatch} = this.props;
        dispatch(closeContext());
        this.closeForm();
    }

    check = (id, events) => {
        if (events.length === 0) return null
        const results = [];
        for (let i = 0; i < events.length; i += 1) {
          if (events[i].id === id) results.push(events[i])
        }
        results.sort((first, second) => {
            const firstHours = first.time.slice(0, 2);
            const secondHours = second.time.slice(0, 2);
            const firstMinutes = first.time.slice(3)
            const secondMinutes = second.time.slice(3);
            if (firstHours > secondHours) return 1
            if (secondHours > firstHours) return -1
            if (firstMinutes > secondMinutes) return 1
            return -1
          });
        return results
    }

    addEvent = () => {
        const {newEvent, newTime, newDescription} = this.state;
        const activeId = this.props.activeId
        if (!newEvent || !newTime) return
        const {dispatch} = this.props;
        dispatch(addEvent(newTime, newEvent, newDescription, activeId));
        this.setState({
            newEvent: '',
            newDescription: '',
            newTime: '',
        })
        this.closeForm();
    }

    closeForm = () => {
        this.setState({
            formIsOpen: false
        })
    }

    newEventInput = (e) => {
        this.setState({
            newEvent: e.target.value
        })
    }
    
    newDescriptionInput = (e) => {
        this.setState({
            newDescription: e.target.value
        })
    }

    newTimeInput = (e) => {
        this.setState({
            newTime: e.target.value
        })
    }

    openForm = () => {
        this.setState({
            formIsOpen: true
        })
    }

    render() {
        const {activeId} = this.props;
        const events = this.check(activeId, this.props.events);
        const renderForm = () => {
            return (
                <div className='form'>
                        <label>
                            Event
                            <input type='text' placeholder='Event' value={this.state.newEvent} onChange={this.newEventInput}/>
                        </label>
                        <div className='event'></div>
                        <label>
                            Description
                            <input type='textarea' placeholder='Description' value={this.state.newDescription} onChange={this.newDescriptionInput}/>
                        </label>
                        <label>
                            Time
                            <input type='time' placeholder='Description' value={this.state.newTime} onChange={this.newTimeInput}/>
                        </label>
                        <div className='button' onClick={this.addEvent}>Add event</div>
                        <div className='button' onClick={this.closeForm}>Close</div>
                    </div>
            )
        }

        return (
            <> 
            {this.props.contextIsOpen &&
            <div id='background'  onClick={this.close}>
                <div className='todoList'>
                    <div className='event'>{activeId}</div>
                    {events && events.map(el => <EventData data={el} key={el.id + el.time}/>)}
                    <div className='button' onClick={this.openForm}>New event</div>
                    <div className='button' id='closeContext' onClick={this.close}>Close</div>
                </div>
                
            </div>}
            {this.state.formIsOpen && renderForm()}
            </>
        )
    }
}

export default connect(mapStateToProps)(CalendarDayTodoList);
