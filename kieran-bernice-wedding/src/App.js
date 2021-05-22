import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { auth } from './firebase'
import './App.css';
import Search from './components/Search'

// Components
import Navbar from './components/Navbar'

// Pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'
import posts from './pages/posts'

function App() {

    const [ user, setUser ] = useState()

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
                <Route user={user} exact path="/posts" component={posts}/>
            </div>
        </>
    )

    return (
        <div className="App">
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








