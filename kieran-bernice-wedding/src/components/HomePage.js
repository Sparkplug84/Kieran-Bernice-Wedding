import React, {useState} from 'react'
import Typewriter from 'typewriter-effect'
import Button from '@material-ui/core/Button'
import Link from 'react-router-dom/Link'

function HomePage() {
    const [displayButton, setDisplayButton] = useState(false)

    function revealButton() {
        setDisplayButton(true)
    }

    return (
        <div className="home__background">
                <Typewriter className="home__welcomeText"
                    onInit={(typewriter) => {
                        typewriter
                        .pauseFor(1000)
                        .typeString("Welcome to the online message platform for the wedding of Bernice & Kieran")
                        .callFunction(revealButton)
                        .start()
                    }}
                />
                { displayButton ? 
                    <Button className="home__enterButton" component={Link} to="/posts">Enter</Button>
                :
                    null
                }
        </div>
    )
}

export default HomePage
