import React from 'react'
import './styleToggleToday.css'
import {connect} from 'react-redux'
import {currentMonth} from '../Action/action.js'


class ToggleToday extends React.Component {

    today = () => {
        const {dispatch} = this.props;
        dispatch(currentMonth());
    }

    render() {
        return(
            <div className='toggleToday'>
                <div className='button' onClick={this.today}>Today</div>
            </div>
        )
    }
}

export default connect()(ToggleToday);
