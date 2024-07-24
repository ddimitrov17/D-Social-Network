import { React } from 'react';
import './postSkeleton.css';
import { bookmarkSVG, commentSVG, dislikeSVG, likeSVG, deleteSVG, editSVG, detailsSVG } from './postSVG';
import { useNavigate } from 'react-router-dom';

export default function PostSkeleton({ text, fullName, username, image, postId, detailsPageToggle, commentToggle }) {
  const navigate = useNavigate();
  function detailsClickHandler() {
    navigate(`/details/${postId}`);
    // console.log(postId);
  }
  return (
    <div className='post-skeleton'>
      <div className="button-container">
        {commentToggle && (detailsPageToggle && (<button className='options-button'>
          {editSVG}
        </button>))}
        {commentToggle && (detailsPageToggle && (<button className='options-button'>
          {deleteSVG}
        </button>))}
        {!commentToggle && (!detailsPageToggle && (
          <button className='options-button' onClick={detailsClickHandler}>
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
        {!commentToggle && <button className='functionalities'>{likeSVG}</button>}
        {!commentToggle && <button className='functionalities'>{dislikeSVG}</button>}
        {!commentToggle && <button className='functionalities'>{commentSVG}</button>}
        {!commentToggle && <button className='functionalities'>{bookmarkSVG}</button>}
      </div>
    </div>
  );
}
