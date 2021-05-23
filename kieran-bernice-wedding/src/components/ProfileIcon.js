import React from 'react'
import firebase from 'firebase'
import { auth } from '../firebase'
import Avatar from '@material-ui/core/Avatar'
import './ProfileIcon.css'



function ProfileIcon() {
    
    const user = firebase.auth().currentUser;

    return (
        <div className="profileIcon__container">
            {
                user? (
                    <a className="profileIcon__link" href="/">
                        <Avatar className="profileIcon__image" src={user.photoURL} />
                        <p className="profileIcon__name">{user.displayName}</p>
                    </a>

                ) : (
                    <div></div>
                )
            }
        </div>
    )
}

export default ProfileIcon
