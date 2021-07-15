import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Link from 'react-router-dom/Link'
import '../components/Home.css'

function home() {
    document.title = `Kieran & Bernice Wedding | Home`

    return (
        <div>
            <section className="home__background" >
                <h1>Home page</h1>
                <Button className="" component={Link} to="/posts">Posts</Button>
            </section>
        </div>
    )
}

export default home
