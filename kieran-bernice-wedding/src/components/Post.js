import React, { useState } from 'react'
import Avatar from "@material-ui/core/Avatar";
import './Post.css';

function Post({ postId, user, username, caption, imageUrl, totalLikes, timestamp }) {
    const [comments, setComments] = useState([])

    return (
        <div className="post">
            <div className="post__header">
                <Avatar 
                    className="post__avatar" 
                    alt="Mark McClean" 
                    src="/static/images/avatar/1.jpg" />
                <h3>{username}</h3>
            </div>

            <img className="post__image" src={imageUrl} alt="" hidden={!imageUrl}/>
            
            {/* <p>{timestamp}</p> */}

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
