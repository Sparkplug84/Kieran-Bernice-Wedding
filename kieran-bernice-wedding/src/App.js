import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { auth } from './firebase'
import './App.css';

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'
import posts from './pages/posts'
import profile from './pages/profile'

function App() {

    const [ user, setUser ] = useState([])

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                setUser(authUser)
            } else {
                setUser(false)
            }
        })
    }, [])

    
//     const homePage = () => (
//     <Route exact path="/" component={home}/>
// )

    const sitePages = () => (
        <>
            <Navbar selected/>
            <div className="container">
                <Route exact path="/login" component={login}/>
                <Route exact path="/signup" component={signup}/>
                <Route exact path="/posts" component={posts} user={user}/>
                <Route path="/:username/:uid" component={profile} />
            </div>
            <Footer />
        </>
    )

    return (
        <div className="app">
            <Router>
                    <Switch>
                        <Route exact path="/" component={home}/>
                        <Route component={sitePages} />
                    </Switch>
            </Router>
        </div>
    )
}



export default App;








