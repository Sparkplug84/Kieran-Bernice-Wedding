import React, { useState, useEffect } from 'react'
import { db } from '../firebase';
import firebase from 'firebase';
import '../components/Post.css';

import Post from '../components/Post'

function Posts() {
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState(null)

    useEffect(() => {
        // this is where the code runs
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            // every time a new post is added, fire this code
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id, 
                post: doc.data()})));
        })
    }, []);

    let recentPosts = posts ? (
        posts.map(({id, post}) => (
            <Post key={id} postId={id} username={post.username} user={user} caption={post.caption} imageUrl={post.imageUrl} likes={post.totalLikes} timestamp={post.timestamp}/>
        ))
    ) : (
        <p>Loading...</p>
    )

    return (
        <div className="posts">
            <h1>Posts</h1>
            {recentPosts}
        </div>
    )
}

export default Posts
