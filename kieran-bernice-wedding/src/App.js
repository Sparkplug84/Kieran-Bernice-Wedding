import './App.css';
import Post from './Post';

function App() {
  return (
    <div className="app">

      <div className="app__header">
          <img className="app__headerImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png" alt=""/>
      </div>

      <Post />
      <Post />
      <Post />


    </div>
  );
}

export default App;
