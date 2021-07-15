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
import Pagination from '../components/Pagination'

function Posts() {
    const [posts, setPosts] = useState([])
    // const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(5)
    const user = firebase.auth().currentUser

    document.title = `Kieran & Bernice Wedding | All Posts`

    useEffect(() => {
        // this is where the code runs
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            // every time a new post is added, fire this code
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id, 
                post: doc.data()})));
        })
    }, []);

    
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    
    // Change page
    const paginate = pageNumber => {
        setCurrentPage(pageNumber)
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
    
    let recentPosts = currentPosts ? (
    currentPosts.map(({id, post}) => (
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
            <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} currentPage={currentPage}/>
        </div>
    )
}

export default Posts
