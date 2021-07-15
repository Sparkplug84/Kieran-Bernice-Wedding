import React, { Component } from 'react'
import Signup from '../components/Signup'

export class signup extends Component {
    render() {

        document.title = `Kieran & Bernice Wedding | Sign Up`
        
        return (
            <div className="signup__page">
                <Signup />
            </div>
        )
    }
}

export default signup
