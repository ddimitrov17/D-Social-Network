import { NavLink, useNavigate } from 'react-router-dom';
import { home, explore, bookmarks, profile, catalog, more, signup, logout, login } from './icons';
import './leftPane.css';
import { useState } from 'react';
import CreatePost from '../createPost/CreatePost';

export default function LeftPane() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  function createPostHandler() {
    setIsModalOpen(true);
    navigate('/create');
  }

  function closeModalHandler() {
    setIsModalOpen(false);
    navigate('/')
  }

  return (
    <div className="left-pane">
      <div className="container">
        <nav>
          <NavLink to="/" activeclassname="selected">
            <span>{home} Home</span>
          </NavLink>
          <NavLink to="/catalog" activeclassname="selected">
            <span>{catalog}Public Feed</span>
          </NavLink>
          <NavLink to="/explore" activeclassname="selected">
            <span>{explore} Explore</span>
          </NavLink>
          <NavLink to="/bookmarks" activeclassname="selected">
            <span>{bookmarks} Bookmarks</span>
          </NavLink>
          <NavLink to="/profile" activeclassname="selected">
            <span>{profile} Profile</span>
          </NavLink>
          <NavLink to="/register" activeclassname="selected">
            <span>{signup} Sign Up</span>
          </NavLink>
          <NavLink to="/login" activeclassname="selected">
            <span>{login} Sign In</span>
          </NavLink>
          <NavLink to="/logout" activeclassname="selected">
            <span>{logout} Sign Out</span>
          </NavLink>
          <button className="more">
            <span>{more} More</span>
          </button>
        </nav>

        <button className="post" onClick={createPostHandler}>Post</button>
        {isModalOpen && <CreatePost onClose={closeModalHandler} />}
        <footer>
          <button className="account">
            <div>
              <div className="name">Dimitar Dimitrov</div>
              <div className="username">@dimitardimitrov</div>
            </div>
          </button>
        </footer>
      </div>
    </div>
  );
}
