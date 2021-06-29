import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog'
import firebase from 'firebase'
import { storage, db } from '../firebase'
import ImageUpload from '../components/ImageUpload'
import Post from '../components/Post'
import { useEffect } from 'react'

function Profile() {
    const {username, uid} = useParams()
    const [progress, setProgress] = useState(0)
    const [imageURL, setImageURL] = useState('')
    const [open, setOpen] = useState(false)
    const [posts, setPosts] = useState([])
    const [profileUserData, setProfileUserData] = useState()
    const [bio, setBio] = useState('')
    const [bioPresent, setBioPresent] = useState(false)
    const user = firebase.auth().currentUser

    useEffect(() => {
        db.collection('users').doc(uid).onSnapshot((doc) => { 
            setProfileUserData(doc.data())
        })
    })

    if(profileUserData !== undefined) {
        if(profileUserData?.displayName !== user?.displayName) {
            // HERE DISABLE INPUT ELEMENTS IF ANOTHER USER IS VIEWING THE PROFILE
        } else {
            // REVERSE SOME STYLING FROM ABOVE
        }
    }

    const handleChange = (e) => {
        setImageURL(e.target.files[0])
    }

    const uploadFileWithClick = () => {
        document.getElementsByClassName('')[0].click()
    }

    document.title = `Kieran & Bernice Wedding | ${username} Profile`

    const myAccount = username === user?.displayName

    const handleClose = () => {
        setOpen(false)
        setImageURL('')
    }

    // POSSIBLE USEEFFECT FOR DESCRIPTION ELEMENT

    useEffect(() => {
        if(imageURL !== '') {
            setOpen(true)
        }
    }, [imageURL])

    const handleUpload = (event) => {

        document.getElementsByClassName('progress')[0].style.display = 'block'
        event.preventDefault()

        const uploadTask = storage.ref(`profileImages/${user.uid}`).put(imageURL)
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
                    .child(user.uid)
                    .getDownloadURL()
                    .then(url => {
                        user.updateProfile({
                            photoURL: url
                        }).then(function () {
                            db.collection("users").doc(uid).update({
                                photoURL: url
                            }).then(function () {
                                handleClose()
                                setProgress(0)

                                window.location.href = `/${user.displayName}/${user.uid}`
                            })
                            // setCaption('')
                            // setImage(null)
                            // setProgress(0)
                        })
                })
            }
        )}

    const addBio = () => {
        // ADD AND REMOVE SOME ELEMENTS WHEN UPDATING THE BIO

    }

    const collapseBio = () => {
        // OPPOSITE OF ADD BIO
    }

    const bioSet = (e) => {
        setBio(e.target.value)
        if (101 - e.target.value.length < 0 || e.target.value.length === 0) {
            // Disable upload button if bio is too long
        } else {
            // Enable upload buttin if bio is within 101 characters
        }
    }

    const bioUpdate = (e) => {
        if (101 - bio.length < 0 || bio.length === 0) {
            return
        } else {
            db.collection('users').doc(uid).update({
                bio
            }).then(
                alert("Please reload the page to aee your changes")
            )
        }
    }

    useEffect(() => {
        db.collection('users').doc(uid).onSnapshot(doc => {
            if (doc.data().bio && doc.data().bio === ''){
                setBioPresent(false)
            } else {
                setBio(doc.data().bio)
                setBioPresent(true)
            }
        })
    }, [])

    useEffect(() => {
        if(bioPresent === false) {
            console.log()
        } else {
            // ADD EDIT BUTTON
            // DISPLAY BIO
        }
    }, [bioPresent])

    return (
        <div className="profile">
            <Dialog open={open} onClose={handleClose} scroll='body' className="dialog2">
                <div className="dialog-container">
                    <div className="profile__head">
                        <p>Are you sure you wat to change your profile picture?</p>
                    </div>
                    <div className="profile__dialogButtons">
                        <button onClick={handleUpload}>Yes</button>
                        <button onClick={handleClose}>No</button>
                    </div>
                </div>
            </Dialog>

            <div className="profile__header">
                <div className="profile__coverPhoto">
                    <img className="profile__avatar" src={profileUserData?.photoURL} onClick={uploadFileWithClick}/>
                    <input onChange={handleChange} type="file" accept="image/*" className="profile__inputImage"/>
                </div>

                <h1 id="documentUsername">{username}</h1>
                <p className="profile__bioText"></p>
                <p onClick={addBio} className="profile__bioEdit">Add Bio</p>
                <div className="profile__bioFields">
                    <textarea className="profile__inputBio" value={bio} placeholder="Who are you?" onChange={bioSet} rows="3" />
                    <div className="profile__InputButtons">
                        <button onClick={collapseBio}>Cancel</button>
                        <button onClick={bioUpdate}>Save</button>
                    </div>
                </div>

                
            </div>
        </div>
    )
}

export default Profile