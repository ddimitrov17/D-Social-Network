import { useEffect, useState } from 'react';
import ChatContent from './ChatContent';
import './MessageSection.css';
import MessageSidebar from './MessagesSidebar';

export default function MessageSection() {
    const [selectedConversationOtherParticipantId, setSelectedConversationOtherParticipantId] = useState(null);
    const [messagesInConversation, setMessagesInConversation] = useState([]);
    // useEffect(() => {
    // 	setTimeout(() => {
    // 		lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    // 	}, 100);
    // }, [messagesInConversation]);
    const handleConversationSelect = (id) => {
        setSelectedConversationOtherParticipantId(id);
        console.log("Selected Conversation User ID:", id); //TODO: Remove
    };

    const handleAddMessage = (newMessage) => {
        setMessagesInConversation((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, newMessage]
        }));
    };

    useEffect(() => {
        if (selectedConversationOtherParticipantId) {
            const fetchMessagesInConversation = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/api/messages/get-all/${selectedConversationOtherParticipantId}`, {
                        method: 'GET',
                        credentials: 'include',
                    });
                    const conversationsMessages = await response.json();
                    setMessagesInConversation(conversationsMessages);
                } catch (error) {
                    console.error("Error fetching conversations:", error);
                }
            };

            fetchMessagesInConversation();
        }
    }, [selectedConversationOtherParticipantId]);

    return (
        <div className="message-section">
            <div className="message-section-box">
                <ChatContent
                    messagesArray={messagesInConversation.messages}
                    chattingToUser={messagesInConversation.userToChat?.fullName}
                    hideLabel={selectedConversationOtherParticipantId == null}
                    chattingUserId={selectedConversationOtherParticipantId}
                    chattingtoUserProfilePicture={messagesInConversation.userToChat?.profilePicture}
                    onAddMessage={handleAddMessage}
                />
                <MessageSidebar onConversationSelect={handleConversationSelect} />
            </div>
        </div>
    );
}
