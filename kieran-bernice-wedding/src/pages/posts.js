import React, { useState, useEffect, Fragment } from 'react'
import { db, auth } from '../firebase';
import { Button } from '@material-ui/core'
import '../components/Post.css';
import '../components/Signup.css';
import { useHistory, Link } from 'react-router-dom';
import firebase from 'firebase'

import Search from '../components/Search'
import ProfileIcon from '../components/ProfileIcon'
import Notification from '../components/Notification'
import ImageUpload from '../components/ImageUpload'
import Post from '../components/Post'

function Posts() {
    const [posts, setPosts] = useState([])
    const user = firebase.auth().currentUser


    useEffect(() => {
        // this is where the code runs
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            // every time a new post is added, fire this code
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id, 
                post: doc.data()})));
        })
    }, []);

    // const signout = () => {
    //     if (user) {
    //         auth.signOut();
    //     }
    // }

    let recentPosts = posts ? (
        posts.map(({id, post}) => (
            <Post key={id} postId={id} username={post.username} user={user} caption={post.caption} imageUrl={post.imageUrl} totalLikes={post.totalLikes} timestamp={post.timestamp} postUserId={post.uid}/>
        ))
    ) : (
        <p>Loading...</p> 
    )

    return (
        <div className="posts">
            { 
                user ?
                <Fragment>
                    {/* <Button className="imageupload__button" onClick={signout}>Sign Out</Button> */}
                    <div className="posts__toolbar">
                        <Search user={user}/>
                        <ProfileIcon user={user}/>
                        <Notification  user={user}/>
                    </div>

                    <ImageUpload username={user?.displayName} user={user} uid={user?.uid} />
                </Fragment> 
                : 
                <Fragment>
                    <div className="login__redirect">
                        <h4>Please log in or sign up to add a post</h4>
                        <Button className="signup__button" component={Link} to="/login">Login Here</Button>
                    </div>
                </Fragment>
            }
            {recentPosts}
        </div>
    )
}

export default Posts
