import Post from './oldPost';
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import ImageUpload from './components/ImageUpload'

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
    const classes = useStyles()
    const [modalStyle] = useState(getModalStyle)
    const [posts, setPosts] = useState([])
    const [open, setOpen] = useState(false)
    const [openSignIn, setOpenSignIn] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [user, setUser] = useState(null)

    

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // user has logged in
                console.log(authUser)
                setUser(authUser)

            } else {
                // user has logged out
                setUser(null)
            }
        })

        return () => {
            // perform some cleanup actions
            unsubscribe()
        }

    }, [user, username]);

    // useEffect Runs a piece of code based on a specific condition

    useEffect(() => {
        // this is where the code runs
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            // every time a new post is added, fire this code
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id, 
                post: doc.data()})));
        })
    }, []);

    const signUp = (event) => {
        event.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            return authUser.user.updateProfile({
                displayName: username
            })
        })
        .catch((error) => alert(error.message))

        setOpen(false)
    }

    const signIn = (event) => {
        event.preventDefault()

        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message))

        setOpenSignIn(false)
    }

  return (
    <div className="app">



        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <div style={modalStyle} className={classes.paper}>
                <form className="app__signup">
                    <center>
                        <img className="app__headerImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png" alt=""/>
                    </center>
                    <Input
                        placeholder="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    <Input
                        placeholder="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    <Input
                        placeholder="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    <Button type="submit" onClick={signUp}>Sign Up</Button>
                </form>
                
            </div>
      </Modal>
        
        <Modal
            open={openSignIn}
            onClose={() => setOpenSignIn(false)}
            >
            <div style={modalStyle} className={classes.paper}>
                <form className="app__signup">
                    <center>
                        <img className="app__headerImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png" alt=""/>
                    </center>
                    <Input
                        placeholder="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        placeholder="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    <Button type="submit" onClick={signIn}>Sign In</Button>
                </form>
                
            </div>
      </Modal>

      <div className="app__header">
          <img className="app__headerImage" src="https://images.vexels.com/media/users/3/130012/isolated/preview/77f5ebe454a2dfb81433f49a93c153cf-dancing-wedding-couple-by-vexels.png" alt=""/>
          <h1 className="app__headerlogo">Kieran &amp; Bernice</h1>
          {user? (
            <Button onClick={() => auth.signOut()}>Logout</Button>
            ): (
            <div className="app__loginContainer">
                <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
                <Button onClick={() => setOpen(true)}>Sign Up</Button>
            </div>
            
            )}
            <MenuIcon className="app__headericon"/>
          </div>

      
      
      {user?.displayName ? (
          <ImageUpload username={user.displayName} />
        ): (
            <h4>Please sign in/sign up to post something</h4>
        )}

        <div className="app__posts">
            {
                posts.map(({id, post}) => (
                    <Post key={id} postId={id} username={post.username} user={user} caption={post.caption} imageUrl={post.imageUrl} likes={post.totalLikes}/>
                ))
            }
        </div>


      

     </div>
  );
}

export default App;