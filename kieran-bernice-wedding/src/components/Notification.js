import React, { useState } from 'react'
import NotificationsIcon from '@material-ui/icons/Notifications';
import './Notification.css'

function Notification() {

    const [notificationsOpen, setNotificationsOpen] = useState(false)
    const smallScreen = window.matchMedia( "(max-width: 500px)" );
    const bigScreen = window.matchMedia( "(min-width: 501px)" );

    const renderNotifications = () => {
        if(notificationsOpen) {
            setNotificationsOpen(false)
            document.getElementsByClassName('notification__dropdown')[0].style.display = 'none'
        } else {
            setNotificationsOpen(true)
            document.getElementsByClassName('notification__dropdown')[0].style.display = 'block'
            if (setNotificationsOpen && bigScreen.matches) {
                document.getElementsByClassName('posts__toolbar')[0].style.justifyContent = null
                document.getElementsByClassName('profileIcon__container')[0].style.width = '33%'
                document.getElementsByClassName('notification__container')[0].style.width = '33%'
                document.getElementsByClassName('posts__searchContainer')[0].style.width = '33%'
                document.getElementsByClassName('notification__icon')[0].style.float = 'right'
                document.getElementsByClassName('notification__dropdown')[0].style.width = '100%'
            }
            if (setNotificationsOpen && smallScreen.matches) {
                document.getElementsByClassName('posts__toolbar')[0].style.justifyContent = 'space-between'
                document.getElementsByClassName('profileIcon__container')[0].style.width = null
                document.getElementsByClassName('notification__container')[0].style.width = null
                document.getElementsByClassName('posts__searchContainer')[0].style.width = null
                document.getElementsByClassName('notification__icon')[0].style.float = null
                document.getElementsByClassName('notification__dropdown')[0].style.width = '95vw'
                document.getElementsByClassName('notification__dropdown')[0].style.display = 'block'
                document.getElementsByClassName('notification__dropdown')[0].style.position = 'absolute'
                document.getElementsByClassName('notification__dropdown')[0].style.left = 'calc(-95vw + 100%)'
            }
            
        }
    }

    return (
        <div className="notification__container" onClick={renderNotifications}>
            <div className="notification__icon">
                <NotificationsIcon className={`notification__expandIcon ${notificationsOpen && 'notification__alert'}`}/>
            </div>
            <div className="notification__dropdown">
                <h3>Notifications</h3>
            </div>
        </div>
        
    )
}

export default Notification
