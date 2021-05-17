import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';

// Components
import Navbar from './components/Navbar'

// Pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'
import posts from './pages/posts'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                        <Switch>
                            <Route exact path="/" component={homePage}/>
                            <Route component={sitePages} />
                        </Switch>
                </Router>
            </div>
        )
    }
}

const homePage = () => (
    <Route exact path="/" component={home}/>
)

const sitePages = () => (
    <>
        <Navbar />
        <div className="container">
            <Route exact path="/login" component={login}/>
            <Route exact path="/signup" component={signup}/>
            <Route exact path="/posts" component={posts}/>
        </div>
    </>
)

export default App;








