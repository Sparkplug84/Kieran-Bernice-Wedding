import React, { useState, useEffect } from 'react'
import Avatar from "@material-ui/core/Avatar";
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import { db } from '../firebase';
import firebase from 'firebase'
import './Post.css';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

function Post({ postId, username, caption, imageUrl, totalLikes, timestamp, postUserId, user }) {

    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    const [commentPhoto, setCommentPhoto] = useState('')
    const [likeIcon, setLikeIcon] = useState('post__likeIcon')
    const [posterImage, setPosterImage] = useState('')
    const [postUser, setPostUser] = useState()
    const [commentActive, setCommentActive] = useState(false);
    const [commentsArrow, setCommentsArrow] = useState(false)
    
    dayjs.extend(relativeTime)

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

    // This is used to retrieve the like status of each post for each user
    useEffect(() => {
        db.collection("posts")
            .doc(postId)
            .collection("likes")
            .doc(user?.uid)
            .get()
            .then(doc2 => {
                if (doc2.data()) {
                    if (likeIcon == 'post__likeIcon') {
                        setLikeIcon('post__likeIcon liked');
                    } else {
                        setLikeIcon('post__likeIcon');
                    }
                }
            })
    }, [postId, user?.uid]);

    // Used to retrieve the user photo for each post
    useEffect(() => {
        if(postUserId) {
            db.collection('users').doc(postUserId).onSnapshot((snapshot) => {
                setPosterImage(snapshot.data().photoURL)
            })
        }
    })

    const likeHandle = (event) => {
        event.preventDefault();
        if (likeIcon == 'post__likeIcon') {
            setLikeIcon('post__likeIcon liked');
        } else {
            setLikeIcon('post__likeIcon');
        }

        db.collection('posts')
            .doc(postId)
            .get()
            .then(docc => {
                const data = docc.data()
                // console.log(show)
                if (likeIcon == 'post__likeIcon') {
                    // console.log(show)
                    db.collection("posts")
                        .doc(postId)
                        .collection("likes")
                        .doc(user.uid)
                        .get()
                        .then(doc2 => {
                            if (doc2.data()) {
                                console.log(doc2.data())
                            } else {
                                db.collection("posts").doc(postId).collection("likes").doc(user.uid).set({
                                    likes: 1
                                });
                                db.collection('posts').doc(postId).update({
                                    totalLikes: data.totalLikes + 1
                                });
                            }
                        })

                } else {
                    db.collection('posts').doc(postId).collection('likes').doc(user.uid).delete().then(function () {
                        db.collection('posts').doc(postId).update({
                            totalLikes: data.totalLikes - 1
                        });
                    })
                }
            })
    }

    const postComment = (event) => {
        event.preventDefault()

        // db.collection('users').doc(user.uid).onSnapshot((snapshot) => {
        //     setCommentImage(snapshot.data()?.photoURL)
        // })

        db.collection('posts').doc(postId).collection('comments').add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            photoURL: user.photoURL,
            uid: user.uid
        })
        setComment('')
        setCommentActive(true)
        setCommentsArrow(!commentsArrow)
    }

    const revealComments = () => {
        setCommentActive(!commentActive)
        setCommentsArrow(!commentsArrow)
    };

    // async function getImageURL(uid) {
    //     return (await db.collection("users").doc(uid).get()).data().photoURL
    //   }

    // useEffect(() => {
    //     if(comment?.uid) {
    //         db.collection('users').doc(comment?.uid).onSnapshot((snapshot) => {
    //             setCommentPhoto(snapshot.data().photoURL)
    //         })
    //     }
    // },[comment?.uid])

    console.log(comment?.uid)

    return (
        <div className="post">
            <div className="post__header">
                <Avatar 
                    component={Link} 
                    to={`/${username}/${postUserId}`}
                    className="post__avatar" 
                    alt="" 
                    src={posterImage !== '' && posterImage} />
                <div className="post__userContainer">
                    <Link className="post__headerLink" to={`/${username}/${postUserId}`}><h3>{username}</h3></Link>
                    <small>{dayjs(timestamp?.toDate()).fromNow()}</small>
                </div>
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
                {
                    user ? 
                    <div className="post__optionLike" onClick={likeHandle}>
                        <p className="post__likeText">Love it!</p>
                        <i className={likeIcon}></i>
                        <p className="post__likeTotal">{totalLikes}</p>
                    </div> 
                    :
                    <div className="post__optionLike">
                        <i className={likeIcon}></i>
                        <p className="post__likeTotal">{totalLikes}</p>
                    </div>
                }
                
                <div className="post__optionComment" onClick={revealComments}>
                    <p>{comments.length} {comments.length == 1 ? "Comment" : "Comments"}</p>
                    <ExpandMoreIcon style={{ transition: "all 0.3s linear" }} className={commentsArrow ? "rotate" : null}/>
                </div>
            </div>

            {user && (
                <form className="post__commentbox">
                    <input 
                        type="text" 
                        className="post__input" 
                        placeholder={`Add a comment ${user?.displayName} ...`}
                        value={comment} 
                        onChange={(e) => setComment(e.target.value)}/>
                    <button
                        className="post__button"
                        disabled={!comment}
                        type="submit"
                        onClick={postComment}>ADD COMMENT  <QuestionAnswerIcon className="button__icon"/>
                    </button>
                </form>
            )}

            <div style={{ transition: "height 0.3s linear" }} className={commentActive ? null : "hidden"}>
                <div className="post__comments">
                    
                    {comments.map((comment) => (
                        <div className="post__comment">
                            <Avatar
                                className="post__avatar"
                                alt=""
                                src={comment.photoURL}
                            />
                            <p>
                                <strong>{comment.username}</strong> {comment.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Post
