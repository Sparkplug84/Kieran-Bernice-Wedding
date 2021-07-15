import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton'
import Drawer from '@material-ui/core/Drawer'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import './Navbar.css'

// Link data for navbar
const headersData = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "Posts",
        href: "/posts",
    },
    {
        label: "Login",
        href: "/login",
    },
    {
        label: "Sign Up",
        href: "/signup",
    },
];

// styles used in navbar
const useStyles = makeStyles(() => ({
        toolbar: {
            display: "flex",
            justifyContent: "space-between",
            ["@media (min-height:400px)"]: { margin: 0, padding: 0 }
            // width: "100%"
        },
        drawerContainer: {
            padding: "20px 30px",
            width: "50vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundImage: "linear-gradient(to bottom right, #ff0000, #8500ff)",
            height: "100%",
        },
        menuButton: {
            fontFamily: "Abel",
            fontWeight: 500,
            fontSize: "18px",
            marginLeft: "38px",
        },
        logoContainer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer"
        },
        drawerButtons: {
            textDecoration: "none",
            fontFamily: "inherit",
            color: "#fff",
            fontSize: "18px",
            margin: "15px 0"
        }
        }));

function Navbar({user, selected}) {

    // Calling the styles used above
    const { menuButton, toolbar, drawerContainer, logoContainer, drawerButtons } = useStyles();
    
    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false,
    })
    const { mobileView, drawerOpen } = state;
    
    useEffect(() => {
        const setResponsiveness = () => {
        return window.innerWidth < 900
            ? setState((prevState) => ({ ...prevState, mobileView: true }))
            : setState((prevState) => ({ ...prevState, mobileView: false }));
        };
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());
    }, []);

    const history = useHistory("");
    const goHome = () => {
            history.push("/")
    }
    

    const displayDesktop = () => {
        return (
        <Toolbar className={toolbar}>
            <div className={logoContainer} onClick={goHome}>
                <img className="app__headerImage" src="https://images.vexels.com/media/users/3/130012/isolated/preview/77f5ebe454a2dfb81433f49a93c153cf-dancing-wedding-couple-by-vexels.png" alt=""/>
                <h1 className="app__headerlogo">Bernice &amp; Kieran</h1>
            </div>
            <div>{getMenuButtons()}</div>
        </Toolbar>
        );
    };

    const displayMobile = () => {
        const handleDrawerOpen = () =>
        setState((prevState) => ({ ...prevState, drawerOpen: true }));
        const handleDrawerClose = () =>
        setState((prevState) => ({ ...prevState, drawerOpen: false }));
    

        return (
        <Toolbar className={toolbar}>
            <div className={logoContainer} onClick={goHome}>
                <img className="app__headerImage" src="https://images.vexels.com/media/users/3/130012/isolated/preview/77f5ebe454a2dfb81433f49a93c153cf-dancing-wedding-couple-by-vexels.png" alt=""/>
                <h1 className="app__headerlogo">Bernice &amp; Kieran</h1>
            </div>
            <IconButton
            {...{
                edge: "start",
                color: "inherit",
                "aria-label": "menu",
                "aria-haspopup": "true",
                onClick: handleDrawerOpen,
            }}
            >
            <MenuIcon  className="navbar__menubutton"/>
            </IconButton>

            <Drawer
            {...{
                anchor: "right",
                open: drawerOpen,
                onClose: handleDrawerClose,
            }}
            >
            
            <CloseIcon onClick={handleDrawerClose} className="navbar__closebutton"/>
            <div className={drawerContainer}>
                <h1 className="navbar__drawertitle">Menu</h1>
                <hr className="navbar__slidemenuhr"/>
                {getDrawerChoices()}</div>
            </Drawer>

        </Toolbar>
        );
    };

    const getDrawerChoices = () => {
        const handleDrawerClose = () =>
        setState((prevState) => ({ ...prevState, drawerOpen: false }));
        return headersData.map(({ label, href }) => {
            return (
                <Button onClick={handleDrawerClose}
                {...{
                    key: label,
                    color: "inherit",
                    to: href,
                    component: Link,
                    className: drawerButtons
                }}
                >
                    {label}
                </Button>
            );
        });
    };

    const getMenuButtons = () => {
        return headersData.map(({ label, href }) => {
        return (
            <Button
            {...{
                key: label,
                color: "inherit",
                to: href,
                component: Link,
                className: menuButton,
            }}
            >
            {label}
            </Button>
        );
        });
    };


    return (
        <AppBar className="app__header">
                {mobileView ? displayMobile() : displayDesktop()}
        </AppBar>
    )
}

export default Navbar