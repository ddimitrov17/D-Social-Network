import { NavLink, useNavigate } from 'react-router-dom';
import { home, explore, bookmarks, profile, catalog, more, signup, logout, login } from './icons';
import './leftPane.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import CreatePost from '../createPost/CreatePost';

export default function LeftPane() {
  const user = useSelector((state) => state.user.currentUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  function createPostHandler() {
    setIsModalOpen(true);
    navigate('/create');
  }

  function closeModalHandler() {
    setIsModalOpen(false);
    navigate(-1);
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
          <button className="more">
            <span>{more} More</span>
          </button>
        </nav>

        <button className="post" onClick={createPostHandler}>
          Post
        </button>
        {isModalOpen && <CreatePost onClose={closeModalHandler} />}
        <footer>
          {user ? (
            <button className="account" onClick={accountButtonHandler}>
              <img className="photo" src={user.profilePicture && user.profilePicture} alt="Profile Picture" />
              <div>
                <div className="name">{user.username && user.fullName}</div>
                <div className="username">{user.username ? `@${user.username}` : ''}</div>
              </div>
            </button>
          ) : (
            <button className="account">
              <div>
                <div className="name">Guest</div>
              </div>
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}
