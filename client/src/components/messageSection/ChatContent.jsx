import { useSelector } from "react-redux";
import Message from "./Message";
import './MessageSection.css';
import { useEffect, useRef, useState } from "react";
import Spinner from "../../loadingSpinner/Spinner";
import { useSocketContext } from "../../context/SocketContext";

export default function ChatContent({
    messagesArray,
    chattingToUser,
    hideLabel,
    chattingtoUserProfilePicture,
    chattingUserId,
    onAddMessage
}) {
    const user = useSelector(state => state.user.currentUser);
    const [isUserLoaded, setIsUserLoaded] = useState(false);
    const [message, setMessage] = useState("");
    const [loadingMessage, setLoadingMessage] = useState(false);

    const { socket } = useSocketContext();

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
            const response = await fetch(`http://localhost:5000/api/messages/send/${chattingUserId}`, {
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
        <div className='chat-content'>
            {hideLabel && <div className="welcome-div">Welcome, {user.fullName}! Select a chat to start messaging.</div>}
            {!hideLabel && (
                <>
                    <div className="current-chat-label">
                        <p className="user-fullname-label">{chattingToUser}</p>
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
