import React from 'react'
import firebase from 'firebase'
import Avatar from '@material-ui/core/Avatar'
import './ProfileIcon.css'



function ProfileIcon() {
    
    const user = firebase.auth().currentUser;

    // db.collection('users')j
    //  .doc('uid') // change to the current user id 
    //  .get().then((user)=>{
    //      if(user.exists){
    //          // now you can do something with user
    //          console.log(user.data())
    //      }
    //  })
    

    return (
        <div className="profileIcon__container">
            {
                user && (
                    <a className="profileIcon__link" href="/">
                        <Avatar className="profileIcon__ image" src={user.photoURL} />
                        <p className="profileIcon__name">{user.displayName}</p>
                    </a>

                )
            }
        </div>
    )
}

export default ProfileIcon
