import React from 'react';

import './createPost.css';

export default function createPost({ onClose }) {
	return (
		<div className="modal-overlay">
			<div className='create-post'>
					<button className="close-button" onClick={onClose}>X</button>
					<form className='form'>
						<textarea
							className='textarea'
							placeholder='What is happening?!'
						/>
						<input type="text" className='image' placeholder='Insert image link here...'/>
						<button className='button'>Post</button>
					</form>
				</div>
		</div>
	);
}
