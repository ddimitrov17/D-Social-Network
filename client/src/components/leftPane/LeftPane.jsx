import { NavLink, useNavigate } from 'react-router-dom';
import { home, explore, bookmarks, profile, catalog, more, signup, logout, login, personalFeed } from './icons';
import './leftPane.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CreatePost from '../createPost/CreatePost';
import CreateEvent from '../createEvent/CreateEvent';

export default function LeftPane() {
  const navigate=useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const [isModalOpen, setIsModalOpen] = useState(false); // create Post
  const [isModalOpenEvent, setIsModalOpenEvent] = useState(false); // create Event

  function createPostHandler() {
    setIsModalOpen(true);
  }

  function closeModalHandler() {
    setIsModalOpen(false);
  }

  function createEventHandler() {
    setIsModalOpenEvent(true);
  }

  function closeModalEventHandler() {
    setIsModalOpenEvent(false);
  }

  function accountButtonHandler() {
    navigate(`/profile/${user.username}`);
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
          {user && (
            <NavLink to="/personalfeed" activeclassname="selected">
              <span>{personalFeed} Personal Feed</span>
            </NavLink>
          )}
          <NavLink to="/explore" activeclassname="selected">
            <span>{explore} Explore</span>
          </NavLink>
          {user && (
            <NavLink to="/bookmarks" activeclassname="selected">
              <span>{bookmarks} Bookmarks</span>
            </NavLink>
          )}
          {user && (
            <NavLink to={`/profile/${user.username}`} activeclassname="selected">
              <span>{profile} Profile</span>
            </NavLink>
          )}
          {!user && (
            <NavLink to="/register" activeclassname="selected">
              <span>{signup} Sign Up</span>
            </NavLink>
          )}
          {!user && (
            <NavLink to="/login" activeclassname="selected">
              <span>{login} Sign In</span>
            </NavLink>
          )}
          {user && (
            <NavLink to="/logout" activeclassname="selected">
              <span>{logout} Sign Out</span>
            </NavLink>
          )}
        </nav>

        {user && <button className="post" onClick={createPostHandler}>Post</button>}
        {user && <button className="post" onClick={createEventHandler}>Create Event</button>}

        {isModalOpen && <CreatePost onClose={closeModalHandler} />}
        {isModalOpenEvent && <CreateEvent onClose={closeModalEventHandler} />}
        <footer>
          {user && (
            <button className="account" onClick={accountButtonHandler}>
              <img className="photo" src={user.profilePicture && user.profilePicture} alt="Profile Picture" />
              <div>
                <div className="name">{user.username && user.fullName}</div>
                <div className="username">{user.username ? `@${user.username}` : ''}</div>
              </div>
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}
