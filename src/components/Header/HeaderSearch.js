import React from 'react'
import './styleHeaderSearch.css'
import EventData from '../Calendar/EventData.js'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
    const props = {
        events: state.events
    }
    return props
};

class HeaderSearch extends React.Component {

    state = {
        results: null,
        text: '',
        context: null
    }

    search = (e) => {
        this.setState({
            text: e.target.value
        })
        const {events} = this.props;
        const results = [];
        const text = e.target.value.toLowerCase();
        for (let i = 0; i < events.length; i += 1) {
            if (events[i].event.toLowerCase().indexOf(text) !== -1) results.push(events[i])
        }
        this.setState({
            results
        });
    }

    openEvent = (ev) => () => {
        this.setState({
            context: ev,
            text: '',
            results: []
        })
    }

    close = () => {
        this.setState({
            context: null,
        });
    }


    render() {
        const {results} = this.state;

        const resultsRender = () => {
            return (
                <div className='results'>
                    {results.map(ev => (
                        <div className='result' onClick={this.openEvent(ev)}>
                            <div className='event'>{ev.event}</div>
                            <div className='date'>{ev.id}</div>
                        </div>
                    ))}
                </div>
            )
        }

        return (
            <div className='headerSearch'>
                <input type="text" onChange={this.search} placeholder="Try to find event" />
                {this.state.text && this.state.results.length !== 0 && resultsRender()}
                {this.state.context && 
                <div className='context'>
                    <EventData data={this.state.context} />
                    <div className='button' onClick={this.close}>Close</div>
                </div>}
            </div>
        )
    }
}

export default connect(mapStateToProps)(HeaderSearch);