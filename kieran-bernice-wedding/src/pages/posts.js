import React, { useState, useEffect } from 'react'
import { db } from '../firebase';
import '../components/Post.css';
import Search from '../components/Search'
import ProfileIcon from '../components/ProfileIcon'
import Notification from '../components/Notification'

import ImageUpload from '../components/ImageUpload'
import Post from '../components/Post'

function Posts() {
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState(null)

    useEffect(() => {
        // this is where the code runs
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
            // every time a new post is added, fire this code
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id, 
                post: doc.data()})));
        })
    }, []);

    let recentPosts = posts ? (
        posts.map(({id, post}) => (
            <Post key={id} postId={id} username={post.username} user={user} caption={post.caption} imageUrl={post.imageUrl} likes={post.totalLikes} createdAt={post.createdAt} postUserId={post.uid}/>
        ))
    ) : (
        <p>Loading...</p>
    )

    return (
        <div className="posts">
            <div className="posts__toolbar">
                <Search user={user}/>
                <ProfileIcon user={user}/>
                <Notification  user={user}/>
            </div>
            {/* {user?.displayName ? (
                <ImageUpload username={user?.displayName} />
                ): (
                    <h4>Please sign in/sign up to post something</h4>
                )} */}

            <ImageUpload username={user?.displayName} />
            {recentPosts}
        </div>
    )
}

export default Posts
