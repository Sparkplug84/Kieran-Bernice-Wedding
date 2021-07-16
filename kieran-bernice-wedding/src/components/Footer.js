import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import HomeIcon from '@material-ui/icons/Home';
import MessageIcon from '@material-ui/icons/Message';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './Footer.css'

function Footer() {

    return (
        <div className="footer">
            <div className="main__links">
                <Button className="footer__links" component={Link} to="/">Home <HomeIcon className="footer__icon"/></Button>
                <Button className="footer__links" component={Link} to="/posts">Posts <MessageIcon className="footer__icon"/></Button>
            </div>
            
            <div className="info">
                <p>Created by:</p>
                <p>Mark McClean</p>
                <div className="info__email">
                    <a href="mailto:mcclean_mark_02@hotmail.com">Contact Me <span><AlternateEmailIcon /></span></a>
                </div>
            </div>
            
            <div className="sub__links">
                <Button className="footer__links" component={Link} to="/login"><AccountCircleIcon className="footer__icon"/> Login</Button>
                <Button className="footer__links" component={Link} to="/signup"><PersonAddIcon className="footer__icon"/> Sign up</Button>
            </div>
            
        </div>
    )
}

export default Footer
