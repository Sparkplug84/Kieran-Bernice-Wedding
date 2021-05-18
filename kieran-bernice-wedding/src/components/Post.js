import React, { useState, Component } from 'react'
import Avatar from "@material-ui/core/Avatar";
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import './Post.css';
// import dayjs from 'dayjs'
// import relativeTime from 'dayjs/plugin/relativeTime'

function Post({ postId, user, username, caption, imageUrl, totalLikes, createdAt }) {
    const [comments, setComments] = useState([])
    // dayjs.extend(relativeTime)

    return (
        <div className="post">
            <div className="post__header">
                <Avatar 
                    className="post__avatar" 
                    alt="Mark McClean" 
                    src="/static/images/avatar/1.jpg" />
                <Button className="post__headerLink" component={Link} to={`/users/${username}`}>{username}</Button>
            </div>

            <img className="post__image" src={imageUrl} alt="" hidden={!imageUrl}/>
            
            {/* <p>{createdAt}</p> */}

            <h4 className="post__text"><strong>{username}</strong> {caption}</h4>

            <div className="post__comments">
                
                {comments.map((comment) => (
                    <p>
                        <strong>{comment.username}</strong> {comment.text}
                    </p>
                ))}
            </div>
        </div>
    )
}

export default Post
