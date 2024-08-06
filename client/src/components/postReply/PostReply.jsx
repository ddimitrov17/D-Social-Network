import { useState } from 'react';
import './PostReply.css'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PostReply({ postId }) {
    const user = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate();
    const [commentData, setCommentData] = useState({
        text: '',
        img: ''
    });

    function onChangeHandler(e) {
        const { name, value } = e.target;
        setCommentData({ ...commentData, [name]: value });
    }

    async function commentSubmitHandler(e) {
        e.preventDefault(); 
        if (!user) {
            navigate('/login');
            return;
        }
        try {
            const response = await fetch(`http://localhost:5000/api/posts/comment/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(commentData),
            });

            if (!response.ok) {
                throw new Error();
            }
            navigate(0);
            // console.log('Comment posted successfully!');
        } catch (error) {
            console.error('There was a problem with the comment posting:', error);
        }
    }

    return (
        <div className='replyToPost'>
            <div className='reply-post'>
                <form className='form' onSubmit={commentSubmitHandler}>
                    <textarea
                        className='textarea'
                        placeholder='Post your reply'
                        name='text'
                        onChange={onChangeHandler}
                        required 
                    />
                    <input type="text"
                        name='img'
                        className='textarea-image'
                        placeholder='Insert image link here...'
                        onChange={onChangeHandler} 
                    />
                    <button 
                        className='button' 
                        type='submit'
                    >
                        Reply
                    </button>
                </form>
            </div>
        </div>
    );
}
