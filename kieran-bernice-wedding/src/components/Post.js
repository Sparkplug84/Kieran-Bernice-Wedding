import React, { useState, useEffect, Component } from 'react'
import Avatar from "@material-ui/core/Avatar";
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { db, auth } from '../firebase';
import firebase from 'firebase'
import './Post.css';
// import dayjs from 'dayjs'
// import relativeTime from 'dayjs/plugin/relativeTime'

function Post({ postId, username, caption, imageUrl, totalLikes, timestamp, postUserId }) {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    const [show, setShow] = useState('like2')
    const [show2, setShow2] = useState('textforlike')
    const [posterImage, setPosterImage] = useState('')
    const [postUser, setPostUser] = useState()
    const [ user, setUser ] = useState([])
    const [commentActive, setCommentActive] = useState("false");

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                setUser(authUser)
            } else {
                setUser(false)
            }
        })
    }, [])
    // dayjs.extend(relativeTime)

    // This is used to get the user data of the post owner
    useEffect(() => {
        if(postUserId) {
            db.collection('users').doc(postUserId).onSnapshot((snapshot) => {
                setPostUser(snapshot.data())
            })
        }
    }, [postUserId])

    // This is used to get all the comments
    useEffect(() => {
        let unsubscribe
        if (postId) {
            unsubscribe = db.collection('posts').doc(postId).collection('comments').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()))
            })
        }
        return () => {
            unsubscribe()
        }
    }, [postId])

    useEffect(() => {
        db.collection("posts")
            .doc(postId)
            .collection("likes")
            .doc(user.uid)
            .get()
            .then(doc2 => {
                if (doc2.data()) {
                    if (show == 'like2') {
                        setShow('like2 blue');
                        setShow2('textforlike bluetextforlike')
                    } else {
                        setShow('like2');
                        setShow2('textforlike')
                    }
                }
            })
    }, [postId, user.uid]);

    useEffect(() => {
        if(postUserId) {
            db.collection('users').doc(postUserId).onSnapshot((snapshot) => {
                setPosterImage(snapshot.data().photoURL)
            })
        }
    })

    const likeHandle = () => {

    }

    const postComments = () => {

    }

    const postComment = (event) => {
        event.preventDefault()

        db.collection('posts').doc(postId).collection('comments').add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setComment('')
        setCommentActive("true")
    }

    const revealComments = () => {
        setCommentActive(!commentActive);
  };


    return (
        <div className="post">
            <div className="post__header">
                <Avatar 
                    className="post__avatar" 
                    alt="" 
                    src={posterImage !== '' && posterImage} />
                <Button className="post__headerLink" component={Link} to={`/users/${username}`}><strong><h3>{username}</h3></strong></Button>
            </div>

            <p className="post__text">{caption}</p>

            <img className="post__image" src={imageUrl} alt="" hidden={!imageUrl}/>

            {!imageUrl ? (
                <hr className="post__hr"/> 
                ): (
                    <span></span>
                )
                
            }

            <div className="post__options">
                <div className="post__optionLike">
                    <p className="post__likeText">Love it!</p>
                    <FavoriteBorderIcon />
                    <p className="post__likeTotal">12{totalLikes}</p>
                </div>
                <div className="post__optionComment" onClick={revealComments}>
                    <p>{comments.length} {comments.length == 1 ? "Comment" : "Comments"}</p>
                </div>
            </div>

            {user && (
                <form className="post__commentbox">
                    <input 
                        type="text" 
                        className="post__input" 
                        placeholder={`Add a comment ${user.displayName} ...`}
                        value={comment} 
                        onChange={(e) => setComment(e.target.value)}/>
                    <button
                        className="post__button"
                        disabled={!comment}
                        type="submit"
                        onClick={postComment}>ADD COMMENT
                    </button>
                </form>
            )}
            
            {/* <p>{timestamp}</p> */}

            <div className={commentActive ? "hidden" : null}>
                <div className="post__comments">
                    
                    {comments.map((comment) => (
                        <p>
                            <strong>{comment.username}</strong> {comment.text}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Post
