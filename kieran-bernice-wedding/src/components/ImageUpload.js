import React, {useState, useRef, useEffect} from 'react'
import { Button } from '@material-ui/core'
import firebase from 'firebase'
import { storage, db } from '../firebase'
import './ImageUpload.css'
import Dialog from '@material-ui/core/Dialog'
import CloseIcon from '@material-ui/icons/Close'
import Avatar from '@material-ui/core/Avatar';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

function ImageUpload({username}) {
    const user = firebase.auth().currentUser
    const [caption, setCaption] = useState('')
    const [progress, setProgress] = useState(0)
    const [image, setImage] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [totalLikes, setTotalLikes] = useState(0)
    const [open, setOpen] = useState(false)
    // const [scroll, setScroll] = useState('paper')


    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
        setImageURL(URL.createObjectURL(e.target.files[0]))
    }

    const uploadFileWithClick = () => {
        document.getElementsByClassName('')[0].click()
    }

    const handleClickOpen = () => {
        setOpen(true)
        // setScroll(scrollType)
    }

    const handleClose = () => {
        setOpen(false)
        setImage("")
        setImageURL("")
    }

    const descriptionElementRef = useRef(null)
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef
            if (descriptionElement !== null) {
                descriptionElement.focus()
            }
        }
    }, [open])

    const handleUpload = (event) => {
        event.preventDefault()

        if (image === '') {
            db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                imageUrl: image,
                totalLikes: totalLikes,
                username: username,
            })
        } else {
            
            const uploadTask = storage.ref(`images/${image.name}`).put(image)

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // progress function...
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress)
                },
                (error) => {
                    // Error function...
                    console.log(error)
                    alert(error.message)
                },
                () => {
                    // complete function ...
                    storage
                        .ref("images")
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            // post image inside db
                            db.collection("posts").add({
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                caption: caption,
                                imageUrl: url,
                                totalLikes: totalLikes,
                                username: username,
                            })
                            setCaption('')
                            setImage(null)
                            setProgress(0)
                    })
                }
            )
        }
        
    }

    return (
        <div className="imageupload">

                <Dialog open={open} onClose={handleClose} scroll='body' className="dialog" >
                    <div className="dialog__container">
                        <div className="dialogHeader__container">
                            <h3>Create Post</h3>
                            <CloseIcon onClick={handleClose} />
                        </div>
                    </div>
                </Dialog>
            

            <div className="imageupload__container">
                <div className="imageupload__post">
                    <Avatar className="searchAvatar" src={user?.photoURL} />
                    <input type="text" value={caption} placeholder={`How is the wedding ${user?.displayName}...`} onChange={event => setCaption(event.target.value)} onClick={handleClickOpen}/>
                </div>
                <Button className="imageupload__button" onClick={handleClickOpen}>Add a Post</Button>
                {/* <progress className="imageupload__progress" value={progress} max="100" hidden={!progress}></progress> */}
                {/* <input type="file" onChange={handleChange}/> */}
            </div>
        </div>
    )
}

export default ImageUpload
