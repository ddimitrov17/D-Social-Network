import { useSelector } from "react-redux";
import Message from "./Message";
import './MessageSection.css';
import { useEffect, useRef, useState } from "react";
import Spinner from "../../loadingSpinner/Spinner";
import { useSocketContext } from "../../context/SocketContext";
import { IoIosMenu } from "react-icons/io";
import { TbArrowBackUp } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

export default function ChatContent({
    messagesArray,
    chattingToUser,
    hideLabel,
    chattingtoUserProfilePicture,
    chattingUserId,
    onAddMessage,
    maxSidebar,
    onSidebarToggle
}) {
    const user = useSelector(state => state.user.currentUser);
    const [isUserLoaded, setIsUserLoaded] = useState(false);
    const [message, setMessage] = useState("");
    const [loadingMessage, setLoadingMessage] = useState(false);

    const { socket } = useSocketContext();

    const navigate=useNavigate();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			onAddMessage(newMessage)
		});

		return () => socket?.off("newMessage");
	}, [socket, messagesArray]);

    const lastMessageRef = useRef(null);

    useEffect(() => {
        if (lastMessageRef.current) {
            setTimeout(() => {
                lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    }, [messagesArray]);

    useEffect(() => {
        if (user) {
            setIsUserLoaded(true);
        }
    }, [user]);

    // useEffect(() => {
    //     if (isUserLoaded) {
    //         // Scroll to bottom when user is loaded
    //         if (lastMessageRef.current) {
    //             lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    //         }
    //     }
    // }, [isUserLoaded]);

    if (!isUserLoaded) {
        return <Spinner />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) {
            return;
        }
        setLoadingMessage(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/messages/send/${chattingUserId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            const data = await response.json();
            console.log("New message data:", data); //TODO: Remove

            onAddMessage(data);

        } catch (error) {
            console.error('Error while sending a message', error);
        } finally {
            setLoadingMessage(false);
            setMessage("");
        }
    };

    return (
        <div className={`chat-content ${maxSidebar ? 'flex0' : ''}`}>
            {hideLabel && <div className="welcome-div">Welcome, {user.fullName}! Select a chat to start messaging.</div>}
            {!hideLabel && (
                <>
                    <div className="current-chat-label">
                        <TbArrowBackUp className="message-section-back-arrow" onClick={() => {
                            navigate('/');
                            document.getElementsByClassName("left-pane")[0].style.display="block";	
                            }}/>
                        <p className="user-fullname-label">{chattingToUser}</p>
                        <IoIosMenu className='message-section-hamburger' onClick={onSidebarToggle}/>
                    </div>
                    <div className="chat-to-overflow">
                        {messagesArray && messagesArray.map((currentMessage, index) => (
                            <div
                                key={currentMessage._id}
                                ref={index === messagesArray.length - 1 ? lastMessageRef : null} 
                            >
                                <Message
                                    messageContent={currentMessage.message}
                                    messageSenderID={currentMessage.senderId}
                                    senderProfilePicture={chattingtoUserProfilePicture}
                                />
                            </div>
                        ))}
                        <form className='message-input-form' onSubmit={handleSubmit}>
                            <div className='message-input-container'>
                                <input
                                    type='text'
                                    className='message-input-field'
                                    placeholder='Send a message...'
                                    name="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                {!loadingMessage && <button type='submit' className='message-send-button'>Send</button>}
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
}
