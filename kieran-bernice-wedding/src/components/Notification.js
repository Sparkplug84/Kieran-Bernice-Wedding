import React, { useState } from 'react'
import NotificationsIcon from '@material-ui/icons/Notifications';
import './Notification.css'

function Notification() {

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
            </div>
        </div>
        
    )
}

export default Notification
