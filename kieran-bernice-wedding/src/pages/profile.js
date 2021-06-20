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

    const myAccount = username === user.displayName

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

    return (
        <div></div>
    )
}

export default Profile