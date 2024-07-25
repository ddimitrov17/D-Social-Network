import { React, useEffect, useState } from 'react';
import './postSkeleton.css';
import { bookmarkSVG, commentSVG, likeSVG, deleteSVG, editSVG, detailsSVG } from './postSVG';
import { useNavigate } from 'react-router-dom';

export default function PostSkeleton({ text, fullName, username, image, postId, detailsPageToggle, commentToggle }) {
  // const [likes, setLikes] = useState(initialLikes);
  const [likedByUser, setLikedByUser] = useState(false);
  const navigate = useNavigate();
  // function detailsClickHandler() {
  //   navigate(`/details/${postId}`);
  //   console.log(postId);
  // }

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
      console.log('Post liked/unliked successfully!');
    } catch (error) {
      console.error('There was a problem with the like functionality:', error);
    }
  };

  return (
    <div className='post-skeleton'>
      <div className="button-container">
        {!commentToggle && (detailsPageToggle && (<button className='options-button'>
          {editSVG}
        </button>))}
        {!commentToggle && (detailsPageToggle && (<button className='options-button'>
          {deleteSVG}
        </button>))}
        {!commentToggle && (!detailsPageToggle && (
          <button className='options-button' onClick={() => navigate(`/details/${postId}`)}>
            {detailsSVG}
          </button>
        ))}
      </div>
      <div className='post-header'>
        <div className='avatar-skeleton'></div>
        <div className='header-text'>
          <div className='name-skeleton'>{fullName}</div>
          <div className='username-skeleton'>{'@'}{username}</div>
        </div>
      </div>
      <div className='content-skeleton'>{text}</div>
      {image && <div className='image-container'><img src={image} alt="Post" className='post-image' /></div>}
      <div className='post-functionality'>
        {!commentToggle && <button className='functionalities-like' name={!likedByUser ? 'gray' : 'red'} onClick={likeFunctionality}>{likeSVG}</button>}
        {!commentToggle && <button className='functionalities-comment'>{commentSVG}</button>}
        {!commentToggle && <button className='functionalities-bookmark'>{bookmarkSVG}</button>}
      </div>
    </div>
  );
}
