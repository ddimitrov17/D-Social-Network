import { React, useEffect, useState } from 'react';
import './postSkeleton.css';
import { bookmarkSVG, commentSVG, likeSVG, deleteSVG, editSVG, detailsSVG } from './postSVG';
import { useNavigate } from 'react-router-dom';
import { cloneWithProps } from './svgClone';
import { useSelector } from 'react-redux';

export default function PostSkeleton({ text, fullName, username, image, postId, detailsPageToggle, commentToggle, authorId, numberOfComments, numberOfLikes, authorProfilePicture, numberOfBookmarks }) {
  // const [likes, setLikes] = useState(initialLikes);
  const user = useSelector((state) => state.user.currentUser);
  const isAuthor = user?._id == authorId;
  console.log(isAuthor)
  const [likedByUser, setLikedByUser] = useState(false);
  const [totalLikes, setTotalLikes] = useState(numberOfLikes)
  const [bookmarkedByUser, setBookmarkedByUser] = useState(false);
  const [totalBookmarks, setTotalBookmarks] = useState(numberOfBookmarks)
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLikeStatus() {
      try {
        const response = await fetch(`http://localhost:5000/api/user/${postId}/status`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch like status');
        }

        const { liked } = await response.json();
        setLikedByUser(liked);
      } catch (error) {
        console.error('Error fetching like status:', error);
      }
    }

    fetchLikeStatus();
  }, [postId]);

  async function likeFunctionality(e) {
    e.preventDefault();
    if (!postId) {
      throw new Error("Post ID is missing.");
    }
    try {
      const response = await fetch(`http://localhost:5000/api/user/like/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(), // No need to send any body data
      });

      if (!response.ok) {
        throw new Error('Failed to update like status');
      }

      const { liked } = await response.json();
      setLikedByUser(liked);
      setTotalLikes(prevLikes => liked ? prevLikes + 1 : prevLikes - 1);
      console.log('Post liked/unliked successfully!');
    } catch (error) {
      console.error('There was a problem with the like functionality:', error);
    }
  };

  useEffect(() => {
    async function fetchBookmarkStatus() {
      try {
        const response = await fetch(`http://localhost:5000/api/user/bookmarkstatus/${postId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch bookmark status');
        }

        const { bookmarked } = await response.json();
        setBookmarkedByUser(bookmarked);
      } catch (error) {
        console.error('Error fetching bookmark status:', error);
      }
    }

    fetchBookmarkStatus();
  }, [postId]);

  async function bookmarkFunctionality(e) {
    e.preventDefault();
    if (!postId) {
      throw new Error("Post ID is missing.");
    }
    try {
      const response = await fetch(`http://localhost:5000/api/user/bookmark/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(), // No need to send any body data
      });

      if (!response.ok) {
        throw new Error('Failed to update bookmark status');
      }

      const { bookmarked } = await response.json();
      setBookmarkedByUser(bookmarked);
      setTotalBookmarks(prevBookmarks => bookmarked ? prevBookmarks + 1 : prevBookmarks - 1);
      console.log('Post bookmarked/unbookmarked successfully!');
    } catch (error) {
      console.error('There was a problem with the bookmark functionality:', error);
    }
  };

  async function deleteFunctionality() {
    if (!postId) {
      throw new Error("Post ID is missing.");
    }
    try {
      const response = await fetch(`http://localhost:5000/api/posts/delete/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the post');
      }

      console.log('Post deleted successfully!');
      navigate('/catalog');
    } catch (error) {
      console.error('There was a problem with the delete functionality:', error);
    }
  }

  function editHandler() {
    navigate(`/edit/${postId}`, { state: { text, image, postId } });
  }

  return (
    <div className='post-skeleton'>
      <div className="button-container">
        {(isAuthor && !commentToggle) && (detailsPageToggle && (<button className='options-button' onClick={editHandler}>
          {editSVG}
        </button>))}
        {(isAuthor && !commentToggle) && (detailsPageToggle && (<button className='options-button' onClick={deleteFunctionality}>
          {deleteSVG}
        </button>))}
        {!commentToggle && (!detailsPageToggle && (
          <button className='options-button' onClick={() => navigate(`/details/${postId}`)}>
            {detailsSVG}
          </button>
        ))}
      </div>
      <div className='post-header'>
        <div className='avatar-skeleton'>
          <img src={authorProfilePicture} alt="" />
        </div>
        <div className='header-text'>
          <div className='name-skeleton'>{fullName}</div>
          <div className='username-skeleton'>{'@'}{username}</div>
        </div>
      </div>
      <div className='content-skeleton'>{text}</div>
      {image && <div className='image-container'><img src={image} alt="Post" className='post-image' /></div>}
      {user && (
        <div className='post-functionality'>
          {!commentToggle && <button className='functionalities-like' name={!likedByUser ? 'gray' : 'green'} onClick={likeFunctionality}>
            {cloneWithProps(likeSVG, { fill: likedByUser ? 'currentColor' : 'none' })}{totalLikes}
          </button>}
          {!commentToggle && <button className='functionalities-comment' onClick={() => navigate(`/details/${postId}`)}>{commentSVG}{numberOfComments}</button>}
          {!commentToggle && <button className='functionalities-bookmark' name={!bookmarkedByUser ? 'gray' : 'green'} onClick={bookmarkFunctionality}>
            {cloneWithProps(bookmarkSVG, { fill: bookmarkedByUser ? 'currentColor' : 'none' })}{totalBookmarks}</button>}
        </div>)}
    </div>
  );
}
