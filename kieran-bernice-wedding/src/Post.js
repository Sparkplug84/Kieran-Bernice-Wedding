import React from 'react'
import './Post.css';
import Avatar from "@material-ui/core/Avatar";

function Post() {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar 
                    className="post__avatar" 
                    alt="Mark McClean" 
                    src="/static/images/avatar/1.jpg" />
                <h3>Username</h3>
            </div>

            <img className="post__image" src="https://www.brides.com/thmb/nCyGXpfYepGFL70qVcTftfmzte4=/1800x1202/filters:fill(auto,1)/GEORGINASAMUEL_1534-9bf58940d6644a4ea82c8a37a58fb838.jpg" alt=""/>

            <h4 className="post__text"><strong>Sparkplug</strong> Amazing photo</h4>
        </div>
    )
}

export default Post
