import React, { useState, useEffect } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { db } from '../firebase'
import Avatar from '@material-ui/core/Avatar';

function Search({ user }) {

    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredUsers, setFilteredUsers] = useState([])
    const smallScreen = window.matchMedia( "(max-width: 500px)" );
    const bigScreen = window.matchMedia( "(min-width: 501px)" );

    const collapseSearch = () => {
        document.getElementsByClassName('posts__search')[0].style.display = 'block'
        document.getElementsByClassName('posts__searchBack')[0].style.display = 'none'
        document.getElementsByClassName('searchBox')[0].style.display = 'none'
        document.getElementsByClassName('posts__searchResults')[0].style.display = 'none'
        document.getElementsByClassName('posts__searchContainerInner')[0].style.display = 'none'
        document.getElementsByClassName('profileIcon__container')[0].style.display = 'block'
        document.getElementsByClassName('notification__container')[0].style.display = 'block'
        document.getElementsByClassName('posts__searchContainer')[0].style.width = null
        document.getElementsByClassName('searchBox')[0].value = ''
        
        if (collapseSearch && bigScreen.matches) {
            document.getElementsByClassName('posts__toolbar')[0].style.justifyContent = null
            document.getElementsByClassName('profileIcon__container')[0].style.width = '33%'
            document.getElementsByClassName('notification__container')[0].style.width = '33%'
            document.getElementsByClassName('posts__searchContainer')[0].style.width = '33%'
            document.getElementsByClassName('notification__icon')[0].style.float = 'right'
        }
    }
    
    const expandSearch = () => {
        document.getElementsByClassName('posts__search')[0].style.display = 'none'
        document.getElementsByClassName('posts__searchBack')[0].style.display = 'block'
        document.getElementsByClassName('searchBox')[0].style.display = 'block'
        document.getElementsByClassName('posts__searchContainerInner')[0].style.display = 'block'
        document.getElementsByClassName('profileIcon__container')[0].style.display = 'block'
        document.getElementsByClassName('notification__container')[0].style.display = 'block'
        

        if (expandSearch && smallScreen.matches) {
            document.getElementsByClassName('profileIcon__container')[0].style.display = 'none'
            document.getElementsByClassName('notification__container')[0].style.display = 'none'
            document.getElementsByClassName('posts__searchContainer')[0].style.width = '100%'
        }
        if (expandSearch && bigScreen.matches) {
            document.getElementsByClassName('posts__toolbar')[0].style.justifyContent = null
            document.getElementsByClassName('profileIcon__container')[0].style.width = '33%'
            document.getElementsByClassName('notification__container')[0].style.width = '33%'
            document.getElementsByClassName('posts__searchContainer')[0].style.width = '33%'
            document.getElementsByClassName('notification__icon')[0].style.float = 'right'
            // To turn the notification expandion off when search box is active
            document.getElementsByClassName('notification__dropdown')[0].style.display = 'none'
            document.getElementsByClassName('notification__icon')[0].style.display = 'flex'
            document.getElementsByClassName('notification__expandContainer')[0].style.display = 'none'
        }
        
    }

    

    useEffect(() => {
        db.collection('users').onSnapshot(snapshot => {
            setUsers(snapshot.docs.map((doc) => doc.data())) // Gets all users from collection
        })

        if (users!==undefined) {
            const finalUsers = users.filter(user => {
                return user.displayName.toLowerCase().indexOf(searchTerm.toLowerCase())!== -1
            })

            setFilteredUsers(finalUsers)
        }
    }, [searchTerm])
    
    const updateSearchResults = (e) => {
        if (e.target.value !== '') {
            setSearchTerm(e.target.value)
            document.getElementsByClassName('posts__searchResults')[0].style.display = 'block'
        } else {
            document.getElementsByClassName('posts__searchResults')[0].style.display = 'none'
        }
    }

    return (
        <div className="posts__searchContainer">
            <div className="posts__searchContainerInner"></div>
            <div className="posts__searchBack" onClick={collapseSearch}>
                <KeyboardBackspaceIcon className="posts__searchBackIcon"/>
            </div>
            <div className="posts__search" onClick={expandSearch}>
                <SearchIcon  className="posts__searchIcon"/>
            </div>
            <input autoFocus type="text" className="searchBox" placeholder="Search guests..." onChange={updateSearchResults}/>
            <div className="posts__searchResults">
                <ul id="searchResults">
                    {
                        user!==undefined && 
                        filteredUsers.map((user1) => (
                            <li>
                                <a onClick={collapseSearch} href={`/${user1?.displayName}/${user1?.uid}`}>
                                    <Avatar className="searchAvatar" src={user1.photoURL} />
                                    <h4 className="searchName">{user1.displayName}</h4>
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Search
