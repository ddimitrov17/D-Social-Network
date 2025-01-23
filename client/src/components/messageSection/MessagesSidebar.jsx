import { useEffect, useState } from "react";
import SidebarConversation from "./SidebarConversation";
import './MessageSection.css';

export default function MessageSidebar({ onConversationSelect, maxSidebar, isOver600px }) {
  const [conversationsData, setConversationsData] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/messages/conversations", {
          method: "GET",
          credentials: "include",
        });
        const conversationsData = await response.json();
        setConversationsData(conversationsData);
        console.log("Conversations of the user: ", conversationsData);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, []);

  const handleConversationClick = (id) => {
    setSelectedConversationId(id);
    onConversationSelect(id);
  };

  return (
    <div className={`sidebar ${maxSidebar ? 'flex100' : ''}`}>
      <div className="conversation-search-section">
        <form>
          <input className="conversation-input-search" type="text" />
          {/* <button className="conversation-search-button">Search</button> */}
        </form>
      </div>
      <div className="conversations">
        {conversationsData.map((currentConversation) => {
          const participantId = currentConversation.participants[0]._id;
          return (
            <SidebarConversation
              key={currentConversation._id}
              profilePicture={currentConversation.participants[0].profilePicture}
              fullName={currentConversation.participants[0].fullName}
              isSelected={participantId === selectedConversationId}
              onClick={() => handleConversationClick(participantId)}
              maxSidebar={maxSidebar}
              isOver600px={isOver600px}
            />
          );
        })}
      </div>
    </div>
  );
}
