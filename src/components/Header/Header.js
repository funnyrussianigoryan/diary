import React from 'react'
import HeaderAdd from './HeaderAdd'
import HeaderSearch from './HeaderSearch'
import './styleHeader.css'

const Header = () => {
    return (
            <div className='header'>
                <HeaderAdd />
                <HeaderSearch />
            </div>
            )
}

export default Header;