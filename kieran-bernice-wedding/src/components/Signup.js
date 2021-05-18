import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth, db } from '../firebase'
import Button from '@material-ui/core/Button'
import './Signup.css'

function Signup() {
    const history = useHistory("")
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const signup = (event) => {
        event.preventDefault()

        auth.createUserWithEmailAndPassword(email, password).then((auth) => {
            if (auth.user) {
                auth.user.updateProfile({
                    displayName: username,
                    photoURL: ""
                }).then((s) => {
                    db.collection('users').doc(auth.user.uid).set({
                        uid: auth.user.uid,
                        displayName: auth.user.displayName,
                        email: auth.user.email,
                        photoURL: "",
                        bio: ""
                    }).then((r) => {
                        history.push("/posts")
                    })
                })
            }
        })
    }

    return (
        <div className="signup__container">
            <h1>Sign Up</h1>
            <form>
                <input required name="name" type="text" placeholder="Name..." onChange={(e) => setUsername(e.target.value)}/>
                <input required name="email" type="email" placeholder="Email Address..."  onChange={(e) => setEmail(e.target.value)}/>
                <input required name="password" type="password" placeholder="Password..."  onChange={(e) => setPassword(e.target.value)}/>
                {/* <input required name="confirm_password" type="password" placeholder="Confirm Password..."/> */}
                <Button type="submit" className="signup__button" onClick={signup}>Sign Up</Button>
                <div className="signup__link">
                    <p className="">Already have an account?</p>
                    <Button className="signup__login" component={Link} to="/login">Login Here</Button>
                </div>
            </form>
        </div>
    )
}

export default Signup
