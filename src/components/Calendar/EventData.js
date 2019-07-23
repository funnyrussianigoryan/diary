import React from 'react'
import classNames from 'classnames'
import {connect} from 'react-redux'
import './styleEventData.css'
import {removeEvent, changeStatus} from '../Action/action.js'

class EventData extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            done: this.props.data.done
        }
    }

    deleteEvent = (id, time) => () => {
        const {dispatch} = this.props;
        dispatch(removeEvent(id, time))
    }

    done = (id, time) => () => {
        const {dispatch} = this.props;
        dispatch(changeStatus(id, time));
        this.setState({
            done: !this.state.done
        })
    }

    render() {
        const {id, time, event, description} = this.props.data;
        const {done} = this.state;
        const timeStyle = classNames({
            'time': true,
            'done': done
        });
        const eventAndDescriptionStyle = classNames({
            'eventAndDescription': true,
            'done': done
        });

        return (
            <div className='eventData'>
                <div className={timeStyle}>{time}</div>
                <div className={eventAndDescriptionStyle}>
                    <div className='event'>{event}</div>
                    <div className='description'>{description}</div>
                </div>
                <div className='buttonGroup'>
                    <div className='button' id='done' onClick={this.done(id, time)}>✔</div>
                    <div className='button' id='delete' onClick={this.deleteEvent(id, time)}>✖</div>
                </div>
            </div>
        )
    }
}

export default connect()(EventData);