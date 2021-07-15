import React from 'react'
import Login from '../components/Login'
import '../components/Login.css'

function login() {

    document.title = `Kieran & Bernice Wedding | Login`

    return (
        <div className="login__page">
            <Login />
        </div>
    )
}

export default login
