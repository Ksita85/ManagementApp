import React from 'react'
import logo from './assets/logo.png'

function Header() {
    return (
    <nav className='navbar bg-dark mb-4 p-2'>
            <div className='container'>
                <a className='navbar-brand text-primary' href="/">
                    <div className='d-flex'>
                        <img src={logo} alt="logo" className='mr-2' />
                        <div><h2>Project Management</h2></div>
                    </div>
                </a>
        </div>
    </nav>
    )
}

export default Header