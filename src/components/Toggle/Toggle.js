import React from 'react'
import ToggleChangeMonth from './ToggleChangeMonth.js'
import ToggleToday from './ToggleToday.js'
import './styleToggle.css'

const Toggle = () => {
    return (
            <div className='toggle'>
                <ToggleChangeMonth />
                <ToggleToday />
            </div>
            )
}

export default Toggle;