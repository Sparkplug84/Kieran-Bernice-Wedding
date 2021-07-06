import React, { useState, useEffect } from 'react'
import './UserPosts.css'
import { db } from '../firebase'

function UserPosts({username}) {
    const [nposts, setNPosts] = useState([])
    const [cuserdata, setCUserdata] = useState()

    useEffect(() => {
        db.collection('posts').onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
                if (doc.data().username == username) {
                    if (nposts.length !== 10) {
                        if (!nposts.includes(doc.data().imageUrl)) {
                            nposts.push(doc.data().imageUrl)
                        }
                    }
                }
            })
        })
    }, [])

    useEffect(() => {
        db.collection('users').onSnapshot((snapshot) => {
            snapshot.docs.map((doc) => {
                if (doc.data().displayName == username) {
                    setCUserdata(doc.data())
                }
            })
        })
    }, [])

    return (
        <div className="UserPosts">
            <h3>Recent Posts</h3>
            <div className="userPosts__posts">
                {
                    nposts.length === 0 ? (
                        <p>It seems {username} has not posted anything yet</p>
                    ) : (
                        nposts.map((imageURL) => {
                            <img src={imageURL} />
                            
                        })
                    )
                }
            </div>
        </div>

    )
}

export default UserPosts