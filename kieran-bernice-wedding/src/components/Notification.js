import React from 'react'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import NotificationsIcon from '@material-ui/icons/Notifications';
import './Notification.css'

function Notification() {
    return (
        <div className="notification__container">
            <div className="notification__icon">
                <NotificationsIcon className="notification__expandIcon"/>
            </div>
        </div>
    )
}

export default Notification
