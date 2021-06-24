import React, { useState } from 'react'
import NotificationsIcon from '@material-ui/icons/Notifications';
import './Notification.css'
import { useEffect } from 'react';
import { db } from '../firebase';
import firebase from 'firebase'
import Avatar from '@material-ui/core/Avatar'
import { useStateValue } from '../StateProvider'

function Notification({user}) {

    // const user = firebase.auth().currentUser;
    const [{ notifications }, dispatch] = useStateValue()
    const [dbuser, setdbuser] = useState(null)
    // const user = firebase.auth().currentUser;
    
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

    // const [notificationsOpen, setNotificationsOpen] = useState(false)
    const smallScreen = window.matchMedia( "(max-width: 500px)" );
    const bigScreen = window.matchMedia( "(min-width: 501px)" );
    
    const hideNotifications = () => {
        document.getElementsByClassName('notification__dropdown')[0].style.display = 'none'
        document.getElementsByClassName('notification__icon')[0].style.display = 'flex'
        document.getElementsByClassName('notification__expandContainer')[0].style.display = 'none'
        document.getElementsByClassName('profileIcon__container')[0].style.display = 'block'
        document.getElementsByClassName('posts__searchContainer')[0].style.display = 'block'
        document.getElementsByClassName('notification__container')[0].style.width = null
        document.getElementsByClassName('posts__searchContainer')[0].style.display = null

        if (hideNotifications && smallScreen.matches) {
            document.getElementsByClassName('notification__icon')[0].style.display = 'flex'
            
        }
        if (hideNotifications && bigScreen.matches) {
            // Creates 3 equal colums on large screens so expansions don't push other colums left or right
            document.getElementsByClassName('posts__toolbar')[0].style.justifyContent = null
            document.getElementsByClassName('profileIcon__container')[0].style.width = '33%'
            document.getElementsByClassName('notification__container')[0].style.width = '33%'
            document.getElementsByClassName('posts__searchContainer')[0].style.width = '33%'
            document.getElementsByClassName('notification__icon')[0].style.float = 'right'
        }
    }

    const renderNotifications = () => {
        document.getElementsByClassName('notification__dropdown')[0].style.display = 'block'
        document.getElementsByClassName('notification__icon')[0].style.display = 'none'
        document.getElementsByClassName('notification__expandContainer')[0].style.display = 'block'
        document.getElementsByClassName('profileIcon__container')[0].style.display = 'block'

        if (renderNotifications && bigScreen.matches) {
            document.getElementsByClassName('posts__toolbar')[0].style.justifyContent = null
            document.getElementsByClassName('profileIcon__container')[0].style.width = '33%'
            document.getElementsByClassName('notification__container')[0].style.width = '33%'
            document.getElementsByClassName('posts__searchContainer')[0].style.width = '33%'
            document.getElementsByClassName('notification__dropdown')[0].style.width = '100%'
            document.getElementsByClassName('notification__icon')[0].style.display = 'none'
            document.getElementsByClassName('notification__expandContainer')[0].style.display = 'flex'
            // Make the search expansion disappear when the notification expasion is active
            document.getElementsByClassName('posts__search')[0].style.display = 'block'
            document.getElementsByClassName('posts__searchBack')[0].style.display = 'none'
            document.getElementsByClassName('searchBox')[0].style.display = 'none'
            document.getElementsByClassName('posts__searchResults')[0].style.display = 'none'
            document.getElementsByClassName('posts__searchContainerInner')[0].style.display = 'none'
        }

        if (renderNotifications && smallScreen.matches) {
            document.getElementsByClassName('posts__toolbar')[0].style.justifyContent = 'space-between'
            document.getElementsByClassName('notification__icon')[0].style.display = 'none'
            document.getElementsByClassName('notification__dropdown')[0].style.display = 'block'
            document.getElementsByClassName('profileIcon__container')[0].style.display = 'none'
            document.getElementsByClassName('posts__searchContainer')[0].style.display = 'none'
            document.getElementsByClassName('notification__container')[0].style.width = '100%'
            document.getElementsByClassName('notification__expandContainer')[0].style.display = 'flex'
        }
            
    }

    useEffect(() => {
        db.collection('posts').onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
                if(user && doc.data().username == user.displayName) { // Checking for only the currently logged in user posts
                    db.collection('posts').doc(doc.id).collection('comments').onSnapshot((snapshot2) => {
                        snapshot2.docs.map(doc2 => {
                            console.log(doc2.data())
                            if(user && doc2.data().username !== user.displayName) {
                                dispatch({
                                    type: 'ADD_TO_NOTIFICATIONS',
                                    item: {
                                        notification: doc.data(),
                                    }
                                })
                            }
                        })
                    })
                }
            })
        })
    }, [user])


    return (
        <div className="notification__container" >
            <div className="notification__icon" onClick={renderNotifications}>
                <NotificationsIcon className="notification__expandIcon" />
            </div>
            <div className="notification__expandContainer" onClick={hideNotifications}>
                <h3 className="notification__title">Notifications</h3>
                <NotificationsIcon className="notification__expandIcon2 notification__alert"/>
            </div>
            <div className="notification__dropdown">
                {
                    notifications.length == 0 ? (
                        <div className="notification__noNotification">
                            {/* <img src={user && user.photoURL} className="notification__profileIcon" /> */}
                            <p className="notification__text">There are no notifications at the moment.</p>
                        </div>
                    ) : (
                        console.log()
                    )
                }

                {
                    notifications.map(({notification}) => (
                        <a href="#" className="notification__title">
                            <div className="notification__optionDrop">
                                <Avatar src={notification?.photoURL} />
                                <div className="notification__info">
                                    <p>{notification.username} <span>commented to your post.</span></p>
                                </div>
                            </div>
                        </a>
                    ))
                }
            </div>
        </div>
        
    )
}

export default Notification
