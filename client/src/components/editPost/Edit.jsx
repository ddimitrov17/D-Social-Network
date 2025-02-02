import { React, useEffect, useState } from 'react';

import './Edit.css'
import { useLocation, useNavigate } from 'react-router-dom';

export default function EditPost() {
    const navigate = useNavigate();
    const location = useLocation();
    const { text: currentText, image: currentImage, postId } = location.state || { text: '', img: '' };
    const [formData, setFormData] = useState({
        text: currentText,
        img: currentImage
    });

    // useEffect(() => {
    //     setFormData({
    //         text: currentText,
    //         img: currentImage
    //     });
    // }, [currentText, currentImage]);

    function changeFormHandler(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        });
    }
    function onClose() {
        navigate(`/details/${postId}`);
    }
    async function editSubmitHandler(e) {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts/edit/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error();
            }
            onClose();
            navigate(`/details/${postId}`);
        } catch (error) {
            console.error('There was a problem with editing the post:', error);
        }
    };
    return (
        <div className='edit-post'>
            <button className="edit-close-button" onClick={onClose}>X</button>
            <form className='form' onSubmit={editSubmitHandler}>
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
                <button className='edit-post-button'>Edit</button>
            </form>
        </div>
    );
}