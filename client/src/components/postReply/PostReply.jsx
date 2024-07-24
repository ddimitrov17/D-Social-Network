import { useState } from 'react';
import './PostReply.css'
import { useNavigate } from 'react-router-dom';

export default function PostReply({ postId }) {
    const navigate=useNavigate();
    const [commentData, setCommentData] = useState({
        text: '',
        img: ''
    })
    function onChangeHandler(e) {
        const { name, value } = e.target;
        setCommentData({ ...commentData, [name]: value });
    }
    async function commentSubmitHandler(e) {
        e.preventDefault(); 
        try {
            const response = await fetch(`http://localhost:5000/api/posts/comment/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(commentData), //TODO: Refactor this function
            });

            if (!response.ok) {
                throw new Error();
                //TODO Error handling
            }
            navigate(0);
            console.log('Comment posted successful!'); //TODO: Remove this
        } catch (error) {
            console.error('There was a problem with the comment posting:', error);
        }
    };
    return (
        <div className='replyToPost'>
            <div className='reply-post'>
                <form className='form' onSubmit={commentSubmitHandler}>
                    <textarea
                        className='textarea'
                        placeholder='Post your reply'
                        name='text'
                        onChange={onChangeHandler}
                    />
                    <input type="text"
                        name='img'
                        className='textarea-image'
                        placeholder='Insert image link here...'
                        onChange={onChangeHandler} />
                    <button className='button'>Reply</button>
                </form>
            </div>
        </div>
    )
}