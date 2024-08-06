import { React, useEffect, useState } from 'react';

import './createPost.css';
import { useNavigate } from 'react-router-dom';

export default function CreatePost({ onClose }) {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		text: '',
		img: ''
	});

	function changeFormHandler(e) {
		const { name, value } = e.target;
		setFormData({
			...formData, [name]: value
		});
	}
	async function createSubmitHandler(e) {
		e.preventDefault();
		try {
			const response = await fetch('http://localhost:5000/api/posts/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify(formData), //TODO: Refactor this function
			});

			if (!response.ok) {
				throw new Error();
			}
			// console.log('Post created successfully!'); 
			onClose();
			navigate('/catalog');
		} catch (error) {
			console.error('There was a problem with the createPost:', error);
		}
	};
	return (
		<div className="modal-overlay">
			<div className='create-post'>
				<button className="close-button" onClick={onClose}>X</button>
				<form className='form' onSubmit={createSubmitHandler}>
					<textarea
						className='textarea'
						placeholder='What is happening?!'
						name='text'
						onChange={changeFormHandler}
					/>
					<input type="text" className='image' placeholder='Insert image link here...' name='img' onChange={changeFormHandler} />
					<button className='button'>Post</button>
				</form>
			</div>
		</div>
	);
}
