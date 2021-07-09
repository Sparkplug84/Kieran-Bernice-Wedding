import React, {useState, useRef, useEffect} from 'react'
import { Button } from '@material-ui/core'
import firebase from 'firebase'
import { storage, db } from '../firebase'
import './ImageUpload.css'
import Dialog from '@material-ui/core/Dialog'
import CloseIcon from '@material-ui/icons/Close'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import PostAddIcon from '@material-ui/icons/PostAdd';
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
    const [dbuser, setdbuser] = useState(null)
    
    const getUser = async () => {
        try {
        const documentSnapshot = await db
            .collection('users')
            .doc(user.uid)
            .get();

        const userData = documentSnapshot.data();
            setdbuser(userData);
            } catch {
            //do whatever
        }
    };

    // Get user on mount
    useEffect(() => {
        getUser();
    }, []);
    
    // const [scroll, setScroll] = useState('paper')
    // const myRef = useRef();

  /*
   *  This is the main different
   */
    // useEffect(()=>{
    //     if (myRef && myRef.current) {
    //         const { textarea } = myRef.current
    //         textarea.focus()
    //     }
    // })
    
    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
        setImageURL(URL.createObjectURL(e.target.files[0]))
    }

    const uploadFileWithClick = () => {
        document.getElementsByClassName('dialog__input')[0].click()

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
                imageUrl: null,
                totalLikes: totalLikes,
                username: user?.displayName,
                uid: user?.uid
            })
            handleClose()
            setCaption('')
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
                                username: user?.displayName,
                                uid: user?.uid
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
                            <h4 className="dialog__header">CREATE POST</h4>
                            <CloseIcon onClick={handleClose} className="dialog__closeIcon"/>
                        </div>
                        <hr className="dialog__hr"/>
                        <div className="dialogUser__container">
                            <Avatar src={dbuser?.photoURL}/>
                            <h4 className="dialog__user">{user?.displayName}</h4>
                        </div>
                        <div className="dialog__inputContainer">
                            <input onChange={handleChange} type="file" className="dialog__input" accept="image/*"/>
                            <textarea autoFocus value={caption} onChange={(e) => setCaption(e.target.value)} rows="4" placeholder={user ? `How is the wedding going ${user?.displayName}...?` : "Sign in to add a post"}></textarea>
                        </div>
                        <div className={`dialog__imagePreviewContainer ${!image && "dialog__input"}`}>
                            <img src={imageURL} className="dialog__imagePreview"/>
                        </div>
                        <progress className="imageupload__progress" value={progress} max="100" hidden={!progress}></progress>
                        <div className="dialog__imageUpload" onClick={uploadFileWithClick}>
                            <Button className="dialog__addPhoto">
                                ADD A PHOTO...<AddAPhotoIcon />
                            </Button>                            
                        </div>
                        {
                            (caption || image) && 
                            <Button className="imageupload__button" onClick={handleUpload}>Upload Post</Button>
                        }
                        
                    </div>
                </Dialog>
            

            <div className="imageupload__container">
                <div className="imageupload__post">
                    <Avatar className="searchAvatar" src={dbuser?.photoURL} />
                    <input type="text" value={caption} placeholder={`How is the wedding ${user?.displayName}...`} onChange={event => setCaption(event.target.value)} onClick={handleClickOpen}/>
                </div>
                <Button className="imageupload__button" onClick={handleClickOpen}>Add a Post <PostAddIcon className="button__icon"/></Button>
                {/* <progress className="imageupload__progress" value={progress} max="100" hidden={!progress}></progress> */}
                {/* <input type="file" onChange={handleChange}/> */}
            </div>
        </div>
    )
}

export default ImageUpload
