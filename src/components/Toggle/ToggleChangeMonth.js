import React from 'react'
import {connect} from 'react-redux'
import './styleToggleChangeMonth.css'
import {nextMonth, previousMonth} from '../Action/action.js'

const mapStateToProps = (state) => {
    const props = {
        newMonth: state.date
    };
    return props;
};

class ToggleChangeMonth extends React.Component {
    back = () => {
        const {dispatch} = this.props;
        dispatch(previousMonth());
    }

    next = () => {
        const {dispatch} = this.props;
        dispatch(nextMonth());
    }

    renderDate = (month) => {
        const date = new Date();
        const currentMonth = date.getMonth();
        date.setMonth(currentMonth + month);
        return ({
            month: date.toString().split(' ')[1],
            year: date.toString().split(' ')[3]
        })  
    }

    render() {
        const {newMonth} = this.props;
        const {month, year} = this.renderDate(newMonth);
        return (
            <div className='toggleChangeMonth'>
                <div className='button' onClick={this.back}>←</div>
                <div className='date'>{month} {year}</div>
                <div className='button' onClick={this.next}>→</div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(ToggleChangeMonth);
