import React, {useState} from 'react'
import {useParams, useHistory, Link} from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ReplyIcon from '@material-ui/icons/Reply';
import CloseIcon from '@material-ui/icons/Close'
import CreateIcon from '@material-ui/icons/Create';
import Avatar from "@material-ui/core/Avatar";
import firebase from 'firebase'
import { storage, db, auth } from '../firebase'
import ImageUpload from '../components/ImageUpload'
import Post from '../components/Post'
import { useEffect } from 'react'
import '../components/Profile.css'

function Profile({ user }) {
    const {username, uid} = useParams()
    const [progress, setProgress] = useState(0)
    const [image, setImage] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [openPhoto, setOpenPhoto] = useState(false)
    const [openBio, setOpenBio] = useState(false)
    const [posts, setPosts] = useState([])
    const [profileUserData, setProfileUserData] = useState()
    const [bio, setBio] = useState('')
    const [bioPresent, setBioPresent] = useState(false)
    const currentUser = firebase.auth().currentUser
    const history = useHistory("");

    useEffect(() => {
        db.collection('users').doc(uid).onSnapshot((doc) => { 
            setProfileUserData(doc.data())
        })
    }, [])

    if(profileUserData !== undefined) {
        if(profileUserData?.displayName !== user?.displayName) {
            // HERE DISABLE INPUT ELEMENTS IF ANOTHER USER IS VIEWING THE PROFILE
        } else {
            // REVERSE SOME STYLING FROM ABOVE
        }
    }

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
        setImageURL(URL.createObjectURL(e.target.files[0]))
    }

    const uploadFileWithClick = () => {
        document.getElementsByClassName('dialog__input')[0].click()
    }

    document.title = `Bernice & Kieran Wedding | ${username} Profile`

    const myAccount = username === user?.displayName

    const handleClose = () => {
        setOpenPhoto(false)
        setImage('')
        setImageURL('')
    }

    // POSSIBLE USEEFFECT FOR DESCRIPTION ELEMENT

    useEffect(() => {
        if(imageURL !== '') {
            setOpenPhoto(true)
        }
    }, [imageURL])

    const handleUpload = (event) => {

        document.getElementsByClassName('progress')[0].style.display = 'block'
        event.preventDefault()

        const uploadTask = storage.ref(`profileImages/${currentUser.uid}`).put(image)
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // progress function...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress)
                if(progress === 100) {
                    handleClose()
                }      
            },
            (error) => {
                // Error function...
                console.log(error)
                alert(error.message)
            },
            () => {
                // complete function ...
                storage
                    .ref("profileImages")
                    .child(currentUser.uid)
                    .getDownloadURL()
                    .then(url => {
                        currentUser.updateProfile({
                            photoURL: url
                        }).then(function () {
                            db.collection("users").doc(uid).update({
                                photoURL: url
                            }).then(function () {
                                handleClose()
                                setProgress(0)

                                window.location.href = `/${user?.displayName}/${user?.uid}`
                                window.location.reload();
                            })
                        })
                })
            }
        )}

    const handleCloseBio = () => {
        setOpenBio(false)
    }

    const handleOpenBio = () => {
        setOpenBio(true)
        // setScroll(scrollType)
    }

    const collapseBio = () => {
        // OPPOSITE OF ADD BIO
    }

    // const bioSet = (e) => {
    //     setBio(e.target.value)
    //     if (101 - e.target.value.length < 0 || e.target.value.length === 0) {
    //         // Disable upload button if bio is too long
    //     } else {
    //         // Enable upload buttin if bio is within 101 characters
    //     }
    // }

    const addBio = (e) => {
            db.collection('users').doc(uid).update({
                bio
            })
            handleCloseBio()
    }
    
    // const bioUpdate = (e) => {
    //     if (101 - bio.length < 0 || bio.length === 0) {
    //         return
    //     } else {
    //         db.collection('users').doc(uid).update({
    //             bio
    //         }).then(
    //             alert("Please reload the page to see your changes")
    //         )
    //     }
    // }

    useEffect(() => {
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data(),
            })))
        })
    }, [])

    useEffect(() => {
        db.collection('users').doc(uid).onSnapshot(doc => {
            if (doc.data()?.bio && doc.data().bio === ""){
                setBioPresent(false)
            } else {
                setBio(doc.data()?.bio)
                setBioPresent(true)
            }
        })
    }, [])

    // useEffect(() => {
    //     if(bioPresent === false) {
    //         console.log()
    //     } else {
    //         // ADD EDIT BUTTON
    //         // DISPLAY BIO
    //     }
    // }, [bioPresent])

    const signout = () => {
        if (currentUser) {
            auth.signOut();
            history.push("/login")
        }
    }

    return (
        <div className="profile">
            <Dialog open={openPhoto} onClose={handleClose} scroll='body' className="dialog2">
                <div className="dialog__container">

                    <div className="dialogHeader__container">
                        <h4 className="dialog__header">ADD OR CHANGE PROFILE PHOTO</h4>
                        <CloseIcon onClick={handleClose} className="dialog__closeIcon"/>
                    </div>

                    <hr className="dialog__hr"/>

                    <div className={`dialog__imagePreviewContainer ${!image && "dialog__input"}`}>
                        <img src={imageURL} className="dialog__imagePreview" alt="preview"/>
                    </div>

                    <div className="profileDialog__body">
                        <p>Are you sure you want to change your profile picture?</p>
                        <progress value={progress} max="100" style={{ display: 'none' }} className="progress" />
                    </div>

                    <div className="profile__dialogButtons">
                        <Button className="dialog__addProfilePhoto" onClick={handleUpload}>Yes <AddAPhotoIcon className="button__icon"/></Button>
                        <Button className="dialog__cancelButton" onClick={handleClose}>Cancel <CloseIcon className="button__icon"/></Button>
                    </div>

                </div>
            </Dialog>

            <Dialog open={openBio} onClose={handleCloseBio} scroll='body' className="dialog__bio">
                <div className="dialog__container">
                    <div className="dialogHeader__container">
                        <h4 className="dialog__header">ADD OR CHANGE BIO</h4>
                        <CloseIcon onClick={handleCloseBio} className="dialog__closeIcon"/>
                    </div>

                    <hr className="dialog__hr"/>

                    <div className="dialog__inputContainer">
                        <textarea autoFocus className="profile__inputBio" value={bio} placeholder="Who are you..?" onChange={(e) => setBio(e.target.value)} rows="3" />
                    </div>


                    <div className="profile__dialogButtons">
                        <Button className="dialog__addProfilePhoto" onClick={addBio}>Add Bio <CreateIcon className="button__icon"/></Button>
                        <Button className="dialog__cancelButton" onClick={handleCloseBio}>Cancel <CloseIcon className="button__icon"/></Button>
                    </div>

                </div>
            </Dialog>
            
            

            <div className="profile__header">
                

                <div className="profile__coverPhoto">
                    {
                        currentUser?.displayName === username ? 
                            <div className="signout__container">
                                <Button className="login__signup" onClick={signout}>Sign Out <ExitToAppIcon className="button__icon"/></Button>
                            </div>
                        :
                        console.log()
                    }
                   
                    
                    <h1 id="documentUsername">{username}</h1>
                    <img className="profile__avatar" src={profileUserData?.photoURL} alt=""/>
                    <input onChange={handleChange} type="file" className="dialog__input" accept="image/*"/>
                </div>

                <div className="profile__title">
                    {
                        currentUser?.displayName === username ?
                            <div className="dialog__imageUpload" onClick={uploadFileWithClick}>
                                <Button className="dialog__addProfilePhoto">
                                    ADD A PHOTO... <AddAPhotoIcon className="button__icon"/>
                                </Button>                            
                            </div>
                            :
                            console.log()
                    }
                </div>

                <div className="profile__container">
                {/* <div className={ username === currentUser?.displayName ? "profile__userContainer" : "profile__container" }> */}

                    <div className="profile__body">

                        <div className="post">

                            <div className="post__header">
                                <Avatar 
                                    className="post__avatar" 
                                    alt="" 
                                    src={profileUserData?.photoURL} />
                                <div className="post__userContainer">
                                    <h3 className="profile__bioEdit">{username} - Bio</h3>
                                </div>
                            </div>

                            <div className="profile__bioFields">
                                { bio === '' ?
                                    <p>No current bio</p>
                                :
                                    <p>{bio}</p>
                                }
                                { username === currentUser?.displayName ? 
                                    <div className="addBio__buttonContainer">
                                        <Button className="login__signup" onClick={handleOpenBio}>
                                            ADD/UPDATE BIO <CreateIcon className="button__icon"/>
                                        </Button>  
                                    </div>
                                    : null
                                }
                            </div>
                        </div>
                        
                    </div>

                    <div className="postAndWatch">
                        {/* {
                            username === currentUser?.displayName ? (
                                <ImageUpload username={username} />
                            ) : (
                                console.log()
                            )
                        } */}
                        <br />
                        <div className="profile__postsHeader">
                            <h4 className="profile__posts">{username} - Recent Posts</h4>
                            <Button className="dialog__addPhoto profile__allPosts" component={Link} to={'/posts'}>
                                All Posts<ReplyIcon className="button__icon"/>
                            </Button> 
                        </div>
                        {
                            posts.map(({ id, post }) => (
                                post.username !== username ? (
                                console.log()
                                ) : (
                                    <Post key={id} postId={id} username={post.username} user={user} caption={post.caption} imageUrl={post.imageUrl} totalLikes={post.totalLikes} timestamp={post.timestamp} postUserId={post.uid}/>
                                    )
                                ))
                        }
                    </div>

                </div>

                

                
            </div>
        </div>
    )
}

export default Profile