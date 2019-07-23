import React from 'react'
import CalendarDay from './CalendarDay.js'
import './styleCalendar.css'
import {connect} from 'react-redux'

const mapSateToProps = (state) => {
    const props = {
        month: state.date,
        events: state.events
    }
    return props
};

class Calendar extends React.Component {

    render() {
        const renderDays = () => {
            const date = new Date();
            const today = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
            const currentMonth = date.getMonth() + this.props.month;
            date.setMonth(currentMonth);
            const forCheck = date.getMonth();
            date.setDate(1);
            const currentDay = (date.getDay() === 0) ? 6 : date.getDay() - 1;
            date.setDate(-currentDay);
            const days = [];
            for (let i = - currentDay; i < 42 - currentDay; i += 1) {
                date.setDate(date.getDate() + 1);
                const id = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
                if (i + currentDay - 35 === 0 && forCheck % 12 !== date.getMonth()) break
                days.push(
                <CalendarDay 
                    activeMonth={forCheck % 12 === date.getMonth()} 
                    key={id} today={id === today} 
                    id={id} day={date.getDate()} 
                    month={date.getMonth() + 1} 
                    year={date.getFullYear()}
                />)
            };
            return days;
        };

        return (
            <div className='calendar'>
                <div className='weekDays'>
                    <div className='weekDay'>Monday</div>
                    <div className='weekDay'>Tuesday</div>
                    <div className='weekDay'>Wednesday</div>
                    <div className='weekDay'>Thursday</div>
                    <div className='weekDay'>Friday</div>
                    <div className='weekDay'>Saturday</div>
                    <div className='weekDay'>Sunday</div>
                </div>
                <div className='calendarDays'>
                    {renderDays()}
                </div>
            </div>
        )
    }
};

export default connect(mapSateToProps)(Calendar);