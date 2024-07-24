import './PostReply.css'

export default function PostReply() {
    return (
        <div className='replyToPost'>
            <div className='reply-post'>
                <form className='form'>
                    <textarea
                        className='textarea'
                        placeholder='Post your reply'
                        name='text'
                    />
                    <input type="text" className='textarea-image' placeholder='Insert image link here...' />
                    <button className='button'>Reply</button>
                </form>
            </div>
        </div>
    )
}