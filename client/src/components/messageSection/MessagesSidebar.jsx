import { useEffect, useState } from "react";
import SidebarConversation from "./SidebarConversation";
import './MessageSection.css';

export default function MessageSidebar({ onConversationSelect, maxSidebar, isOver600px }) {
  const [conversationsData, setConversationsData] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/messages/conversations", {
          method: "GET",
          credentials: "include",
        });
        const conversationsData = await response.json();
        setConversationsData(conversationsData);
        // console.log("Conversations of the user: ", conversationsData);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, []);


  const searchHandler = async (e) => {
    const newQuery = e.target.value;
    // console.log(newQuery)
    setSearchQuery(newQuery);

    if (!newQuery.trim()) {
        setSearchResults([]);
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/posts/explore?query=${newQuery}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch search results');
        }

        const data = await response.json();
        setSearchResults(data);
        // console.log(searchResults.users)
        // console.log(data)
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
};

  const handleConversationClick = (id) => {
    setSelectedConversationId(id);
    onConversationSelect(id);
  };

  return (
    <div className={`sidebar ${maxSidebar ? 'flex100' : ''}`}>
      <div className="conversation-search-section">
        <form>
          <input
            className="conversation-input-search"
            type="text"
            onChange={searchHandler}
            placeholder="Search..."
          />
        </form>
      </div>
      <div className="conversations">
        {searchQuery === '' &&
          conversationsData.map((currentConversation) => {
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

        {searchQuery !== '' &&
          searchResults.users?.map((user) => (
            <SidebarConversation
              key={user._id}
              profilePicture={user.profilePicture}
              fullName={user.fullName}
              isSelected={user._id === selectedConversationId}
              onClick={() => handleConversationClick(user._id)}
              maxSidebar={maxSidebar}
              isOver600px={isOver600px}
            />
          ))}
      </div>
    </div>
  );
}
