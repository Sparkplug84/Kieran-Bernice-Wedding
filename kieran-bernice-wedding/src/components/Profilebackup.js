import React, {useState, useEffect} from 'react'
import { db } from '../firebase';
import firebase from 'firebase'
import Avatar from '@material-ui/core/Avatar'
import './ProfileIcon.css'



function ProfileIcon() {
    const [dbuser, setdbuser] = useState(null)

    // db.collection('users').doc(authUser.uid).get().then(snapshot => {
    //     const dbUser = snapshot.val();
    // }
    
    const user = firebase.auth().currentUser;
    // console.log(user)

    // useEffect(() => {
    //     db.collection('users').doc(user.uid).get().then(doc => {
    //         console.log(doc.data())
    //         // setdbuser(doc.data())
    //     })
    // },)
    
    const getUser = async () => {
        try {
        const documentSnapshot = await db
            .collection('users')
            .doc(user.uid)
            .get();

        const userData = documentSnapshot.data();
        setdbuser(userData);
        } catch {
        //do whatever
        }
    };

    // Get user on mount
    useEffect(() => {
        getUser();
    }, []);
    
    // console.log(user)

    // db.collection('users')
    //  .doc('uid') // change to the current user id 
    //  .get().then((user)=>{
    //      if(user.exists){
    //          // now you can do something with user
    //          console.log(user.data())
    //      }
    //  })

    // firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).once('value', function (snapshot) {
    //     console.log(snapshot.val())
    // });

    
    

    return (
        <div className="profileIcon__container">
            {
                user && (
                    <a className="profileIcon__link" href="/">
                        <Avatar className="profileIcon__ image" src={dbuser.photoURL} />
                        <p className="profileIcon__name">{dbuser.displayName}</p>
                    </a>

                )
            }
        </div>
    )
}

export default ProfileIcon
