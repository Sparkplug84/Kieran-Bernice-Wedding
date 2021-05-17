import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Link from 'react-router-dom/Link'

export class home extends Component {
    render() {
        return (
            <div>
                <h1>Home page</h1>
                <Button className="" component={Link} to="/posts">Posts</Button>
            </div>
        )
    }
}

export default home
