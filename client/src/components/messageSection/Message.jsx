import { useSelector } from 'react-redux';
import './Message.css';
import { useEffect, useState } from 'react';

export default function Message({ messageContent, messageSenderID, senderProfilePicture }) {
    const user = useSelector(state => state.user.currentUser);
    const [isUserLoaded, setIsUserLoaded] = useState(false);

    useEffect(() => {
        if (user) {
            setIsUserLoaded(true);
            // console.log("User loaded:", user); //TODO: REMOVE
        }
    }, [user]);

    if (!isUserLoaded) {
        return <div>Loading...</div>;
    }

    const fromMe = messageSenderID === user._id;
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? user.profilePicture : senderProfilePicture;

    return (
        <div className={`chat-container ${chatClassName}`}>
            {!fromMe && (
                <>
                    <div className="image-container-pic">
                        <img className='profile-picture-message' src={profilePic} alt='Profile' />
                    </div>
                    <div className='chat-bubble'>{messageContent}</div>
                </>
            )}
            {fromMe && (
                <>
                    <div className='chat-bubble'>{messageContent}</div>
                    <div className="image-container-pic">
                        <img className='profile-picture-message' src={profilePic} alt='Profile' />
                    </div>
                </>
            )}
        </div>
    );
}
