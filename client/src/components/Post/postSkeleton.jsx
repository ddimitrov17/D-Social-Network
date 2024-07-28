import { React, useEffect, useState } from 'react';
import './postSkeleton.css';
import { bookmarkSVG, commentSVG, likeSVG, deleteSVG, editSVG, detailsSVG } from './postSVG';
import { useNavigate } from 'react-router-dom';
import { cloneWithProps } from './svgClone';

export default function PostSkeleton({ text, fullName, username, image, postId, detailsPageToggle, commentToggle, numberOfComments, numberOfLikes, authorProfilePicture }) {
  // const [likes, setLikes] = useState(initialLikes);
  const [likedByUser, setLikedByUser] = useState(false);
  const [totalLikes, setTotalLikes] = useState(numberOfLikes)
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchLikeStatus() {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${postId}/status`, {
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
      const response = await fetch(`http://localhost:5000/api/posts/like/${postId}`, {
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
        {!commentToggle && (detailsPageToggle && (<button className='options-button' onClick={editHandler}>
          {editSVG}
        </button>))}
        {!commentToggle && (detailsPageToggle && (<button className='options-button' onClick={deleteFunctionality}>
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
      <div className='post-functionality'>
        {!commentToggle && <button className='functionalities-like' name={!likedByUser ? 'gray' : 'green'} onClick={likeFunctionality}>
          {cloneWithProps(likeSVG, { fill: likedByUser ? 'currentColor' : 'none' })}{totalLikes}
        </button>}
        {!commentToggle && <button className='functionalities-comment' onClick={() => navigate(`/details/${postId}`)}>{commentSVG}{numberOfComments}</button>}
        {!commentToggle && <button className='functionalities-bookmark'>{bookmarkSVG}</button>}
      </div>
    </div>
  );
}
