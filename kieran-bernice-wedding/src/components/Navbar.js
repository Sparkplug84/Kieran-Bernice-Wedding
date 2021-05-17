import React, { Component } from 'react'
import Link from 'react-router-dom/Link'
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

class Navbar extends Component {
    render() {
        return (
            <AppBar className="app__header">
                <Toolbar>
                    <Button className="app__menulink" component={Link} to="/">Home</Button>
                    <Button className="app__menulink" component={Link} to="/login">Login</Button>
                    <Button className="app__menulink" component={Link} to="/signup">Signup</Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar