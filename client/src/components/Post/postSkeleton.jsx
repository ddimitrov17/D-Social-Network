import { React } from 'react';
import './postSkeleton.css';
import { bookmarkSVG, commentSVG, dislikeSVG, likeSVG, deleteSVG, editSVG, detailsSVG } from './postSVG';

export default function PostSkeleton({ text, fullName, username, image }) {
  return (
      <div className='post-skeleton'>
        <div className="button-container">
          <button className='options-button'>
            {editSVG}
          </button>
          <button className='options-button'>
            {deleteSVG}
          </button>
          <button className='options-button'>
            {detailsSVG}
          </button>
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
          <button className='functionalities'>{likeSVG}</button>
          <button className='functionalities'>{dislikeSVG}</button>
          <button className='functionalities'>{commentSVG}</button>
          <button className='functionalities'>{bookmarkSVG}</button>
        </div>
      </div>
  );
}
