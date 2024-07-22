import { React, useState } from 'react';
import './postSkeleton.css';
import { bookmarkSVG, commentSVG, dislikeSVG, likeSVG, optionsSVG } from './postSVG';

export default function PostSkeleton({ text, fullName, username, image }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className='post-skeleton'>
      <button className='options-button' onClick={toggleDropdown}>
        {optionsSVG}
      </button>
      <div className={`dropdown-menu ${dropdownVisible ? 'visible' : ''}`}>
        <div className='dropdown-item'>Details</div>
        <div className='dropdown-item'>Edit</div>
        <div className='dropdown-item'>Delete</div>
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
