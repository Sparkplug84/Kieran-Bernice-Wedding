import React, {useState, useEffect} from 'react'
import { db } from '../firebase';
import firebase from 'firebase'
import Avatar from '@material-ui/core/Avatar'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './ProfileIcon.css'



function ProfileIcon() {
    const [dbuser, setdbuser] = useState(null)
    const user = firebase.auth().currentUser;
    
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


    return (
        <div className="profileIcon__container">
            {
                user && (
                    <a className="profileIcon__link" href={`/${user?.displayName}/${user?.uid}`}>
                        <Avatar className="profileIcon__image" src={user ? dbuser?.photoURL : ''} />
                        <div className="profileIcon__details">
                            <p className="profileIcon__name">{user ? dbuser?.displayName : "Sign in to view profile"}</p>
                            <AccountCircleIcon className="user__icon"/>
                        </div>
                    </a>

                )
            }
        </div>
    )
}

export default ProfileIcon
