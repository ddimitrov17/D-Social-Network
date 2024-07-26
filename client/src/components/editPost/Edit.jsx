import { React, useEffect, useState } from 'react';

import './Edit.css'
import { useLocation, useNavigate } from 'react-router-dom';

export default function EditPost() {
    const navigate = useNavigate();
    const location = useLocation();
    const { text: currentText, image: currentImage } = location.state || { text: '', img: '' };

    const [formData, setFormData] = useState({
        text: currentText,
        img: currentImage
    });

    useEffect(() => {
        setFormData({
            text: currentText,
            img: currentImage
        });
    }, [currentText, currentImage]);

    function changeFormHandler(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        });
    }
    function onClose() {
        navigate(-1);
    }
    // async function editSubmitHandler(e) {
    // 	e.preventDefault();
    // 	try {
    // 		const response = await fetch('http://localhost:5000/api/posts/create', {
    // 			method: 'POST',
    // 			headers: {
    // 				'Content-Type': 'application/json'
    // 			},
    // 			credentials: 'include',
    // 			body: JSON.stringify(formData), //TODO: Refactor this function
    // 		});

    // 		if (!response.ok) {
    // 			throw new Error();
    // 			//TODO Error handling
    // 		}
    // 		console.log('Post created successfully!'); //TODO: Remove this
    // 		onClose();
    // 		navigate('/catalog');
    // 	} catch (error) {
    // 		console.error('There was a problem with the signup:', error);
    // 	}
    // };
    return (
            <div className='edit-post'>
                <button className="edit-close-button" onClick={onClose}>X</button>
                <form className='form'>
                    <textarea
                        className='textarea'
                        name='text'
                        value={formData.text}
                        onChange={changeFormHandler}
                    />
                    <input type="text"
                        className='image'
                        name='img'
                        onChange={changeFormHandler}
                        value={formData.img} />
                    <button className='button'>Edit</button>
                </form>
            </div>
    );
}