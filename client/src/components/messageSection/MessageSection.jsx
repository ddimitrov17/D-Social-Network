import { useEffect, useState } from 'react';
import ChatContent from './ChatContent';
import './MessageSection.css';
import MessageSidebar from './MessagesSidebar';

export default function MessageSection() {
    const [selectedConversationOtherParticipantId, setSelectedConversationOtherParticipantId] = useState(null);
    const [messagesInConversation, setMessagesInConversation] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            console.log("Window Width:", window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const [showSidebar, setShowSidebar] = useState(true);
    const isUnder800px = windowWidth < 800;
    let maxSidebar=false;
    if (isUnder800px && selectedConversationOtherParticipantId==null) {
        maxSidebar=true;
    }
    const isOver800px = windowWidth > 800;    
    const isUnder600px = windowWidth < 600;     
    const isOver600px = windowWidth > 600;                               
    // useEffect(() => {
    // 	setTimeout(() => {
    // 		lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    // 	}, 100);
    // }, [messagesInConversation]);
    const handleConversationSelect = (id) => {
        setSelectedConversationOtherParticipantId(id);
        // console.log("Selected Conversation User ID:", id);
    };

    const handleAddMessage = (newMessage) => {
        setMessagesInConversation((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, newMessage]
        }));
    };

    useEffect(() => {
        if (selectedConversationOtherParticipantId) {
            setShowSidebar(false);
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
    useEffect(() => {
        const leftPane = document.getElementsByClassName("left-pane")[0];
        if (isUnder600px && selectedConversationOtherParticipantId!=null && location.pathname==="/messages") {
            leftPane.style.display = "none"
        } else {
            leftPane.style.display = "block";
        }
    }, [isUnder600px,selectedConversationOtherParticipantId,location.pathname]);

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
                    maxSidebar={maxSidebar}
                    onSidebarToggle={() => setShowSidebar(!showSidebar)}
                />
                {(showSidebar || isOver800px) && <MessageSidebar onConversationSelect={handleConversationSelect} maxSidebar={maxSidebar} isOver600px={isOver600px}/>}
            </div>
        </div>
    );
}
