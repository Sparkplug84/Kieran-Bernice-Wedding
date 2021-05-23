import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../firebase'
import firebase from 'firebase'
import Button from '@material-ui/core/Button'
import './Login.css'

function Login() {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = (event) => {
        event.preventDefault()

        auth.signInWithEmailAndPassword(email, password).then((auth) => {
            history.push("/posts")
        }).catch((e) => {
            if (e.message === "The password is invalid or the user does not have a password.") {
                alert("Please check your credentials again")
            } else if (e.message === "There is no user record corresponding to this identifier. The user may have been deleted") {
                alert("Please check your credentials again")
            } else {
                alert(e.message)
            }
        })
    }

    return (
        <div className="login__container">
            <h1>Login</h1>
            <form>
                <input type="email" placeholder="Email Address..." onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password..." onChange={(e) => setPassword(e.target.value)}/>
                <Button type="submit" className="login__button" onClick={login}>Login</Button>
                <div className="login__link">
                    <p className="">Not signed up yet?</p>
                    <Button className="login__signup" component={Link} to="/signup">Sign up Here</Button>
                </div>
            </form>
        </div>
    )
}

export default Login
