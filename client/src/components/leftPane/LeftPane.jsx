import { NavLink, useNavigate } from 'react-router-dom';
import { home, explore, bookmarks, profile, catalog, more, signup, logout, login, personalFeed, eventsIcon, messageSection } from './icons';
import './leftPane.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CreatePost from '../createPost/CreatePost';
import CreateEvent from '../createEvent/CreateEvent';
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoCreateOutline } from "react-icons/io5";



export default function LeftPane() {
  const navigate = useNavigate();
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
            <span><span className="icon">{home}</span><span className="nav-text">Home</span></span>
          </NavLink>
          <NavLink to="/catalog" activeclassname="selected">
            <span><span className="icon">{catalog}</span><span className="nav-text">Public Feed</span></span>
          </NavLink>
          {user && (
            <NavLink to="/personalfeed" activeclassname="selected">
              <span><span className="icon">{personalFeed}</span><span className="nav-text">Personal Feed</span></span>
            </NavLink>
          )}
          <NavLink to="/events" activeclassname="selected">
            <span><span className="icon">{eventsIcon}</span><span className="nav-text">Events</span></span>
          </NavLink>
          <NavLink to="/explore" activeclassname="selected">
            <span><span className="icon">{explore}</span><span className="nav-text">Explore</span></span>
          </NavLink>
          {user && (
            <NavLink to="/messages" activeclassname="selected">
              <span><span className="icon">{messageSection}</span><span className="nav-text">Message Section</span></span>
            </NavLink>
          )}
          {user && (
            <NavLink to="/bookmarks" activeclassname="selected">
              <span><span className="icon">{bookmarks}</span><span className="nav-text">Bookmarks</span></span>
            </NavLink>
          )}
          {user && (
            <NavLink to={`/profile/${user.username}`} activeclassname="selected">
              <span><span className="icon">{profile}</span><span className="nav-text">Profile</span></span>
            </NavLink>
          )}
          {!user && (
            <NavLink to="/register" activeclassname="selected">
              <span><span className="icon">{signup}</span><span className="nav-text">Sign Up</span></span>
            </NavLink>
          )}
          {!user && (
            <NavLink to="/login" activeclassname="selected">
              <span><span className="icon">{login}</span><span className="nav-text">Sign In</span></span>
            </NavLink>
          )}
          {user && (
            <NavLink to="/logout" activeclassname="selected">
              <span><span className="icon">{logout}</span><span className="nav-text">Sign Out</span></span>
            </NavLink>
          )}
        </nav>
        <div className="buttons">
          {user && <button className="post" onClick={createPostHandler}>Post</button>}
          {user && <button className="post" onClick={createEventHandler}>Create Event</button>}
          {user && <button className="post post-medium-screen" onClick={createPostHandler}><span className='create-icon-span'><IoCreateOutline className="icon-post"/></span></button>}
          {user && <button className="post post-medium-screen" onClick={createEventHandler}><span className='create-icon-span'><IoIosAddCircleOutline className="icon-post" /></span></button>}
        </div>
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
