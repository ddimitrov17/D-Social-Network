export default function SidebarConversation({ profilePicture, fullName, onClick, isSelected, maxSidebar, isOver600px }) {
  return (
    <button
      className={`user-conversation-button${isSelected ? '-clicked' : ''}`}
      onClick={onClick}
    >
      <div className='user-conversation-credentials'>
        <img src={profilePicture} alt="Profile Picture" />
        {(maxSidebar || isOver600px) && (<div className='user-conversation-details'>
          <div className='user-conversation-fullname'>{fullName}</div>
        </div>)}
      </div>
    </button>
  );
}
