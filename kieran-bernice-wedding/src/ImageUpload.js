import React, {useState} from 'react'
import { Button } from '@material-ui/core'
import firebase from 'firebase'
import { storage, db } from './firebase'
import './ImageUpload.css'

function ImageUpload({username}) {
    const [caption, setCaption] = useState('')
    const [progress, setProgress] = useState(0)
    const [image, setImage] = useState('')
    const [totalLikes, setTotalLikes] = useState(0)

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleUpload = (event) => {
        event.preventDefault()

        if (image === '') {
            db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                imageUrl: image,
                totalLikes: totalLikes,
                username: username
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
            <div className="imageupload__container">
                <progress className="imageupload__progress" value={progress} max="100" hidden={!progress}></progress>
                <input type="text" placeholder="Enter a caption..." onChange={event => setCaption(event.target.value)}/>
                <input type="file" onChange={handleChange}/>
                <Button className="imageupload__button" onClick={handleUpload}>Upload</Button>
            </div>
        </div>
    )
}

export default ImageUpload
