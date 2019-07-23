import React from 'react'
import './styleCalendarDay.css'
import classNames from 'classnames'
import {connect} from 'react-redux'
import {openContext} from '../Action/action.js'

const mapStateToProps = (state) => {
    const props = {
        contextIsOpen: state.context,
        events: state.events
    }
    return props;
}

class CalendarDay extends React.Component {
    state = {
        event: '',
        description: '',
        eventIsAdded: false,
        id: this.props.id
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

    open = () => {
        const {dispatch} = this.props;
        dispatch(openContext(this.state.id))
    }

    render() {

        const calendarDayClass = classNames({
            'calendarDay': true,
            'activeMonth': this.props.activeMonth,
            'today': this.props.today
        })

        const {day, id, events} = this.props;

        const data = this.check(id, events);

        return (
            <div className={calendarDayClass}>
                <div className='forClick' onClick={this.open}>
                    <p className='date'>{day}</p>
                    {data && data.map(el => {
                        const classForEvent = classNames({
                            'event': true,
                            'done': el.done
                        });
                        return (
                            <p className={classForEvent}>{el.event}</p>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(CalendarDay);