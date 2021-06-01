import React, {useState, useEffect} from 'react'
import { db } from '../firebase';
import firebase from 'firebase'
import Avatar from '@material-ui/core/Avatar'
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
                    <a className="profileIcon__link" href="/">
                        <Avatar className="profileIcon__ image" src={dbuser?.photoURL} />
                        <p className="profileIcon__name">{dbuser?.displayName}</p>
                    </a>

                )
            }
        </div>
    )
}

export default ProfileIcon
