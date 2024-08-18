import { useEffect, useState } from 'react';
import './rightPane.css';
import UserMatch from '../explore/UserMatch';
import Spinner from '../../loadingSpinner/Spinner';

export default function RightPane() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followStatus, setFollowStatus] = useState({}); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user/suggested-users', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const usersData = await response.json();

        const initialFollowStatus = {};
        usersData.forEach(user => {
          initialFollowStatus[user._id] = false; 
        });

        setUsers(usersData);
        setFollowStatus(initialFollowStatus);
      } catch (error) {
        console.error('Error fetching suggested users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  async function followFunctionality(id, e) {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/user/follow/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(), 
      });

      if (!response.ok) {
        throw new Error('Failed to update follow status');
      }

      const { followed } = await response.json();
      
      setFollowStatus(prevStatus => ({
        ...prevStatus,
        [id]: followed 
      }));

      console.log('User followed/unfollowed successfully!');
    } catch (error) {
      console.error('There was a problem with the follow functionality:', error);
    }
  }

  return (
    <div className="right-pane">
      {loading ? (
        <Spinner /> 
      ) : (
        <div className='suggested'>
          {users.length > 0 ? (
            users.map(currentUser => (
              <div key={currentUser._id} className='user-match-container'>
                <UserMatch
                  username={currentUser.username}
                  fullName={currentUser.fullName}
                  profilePicture={currentUser.profilePicture}
                />
                <button
                  className='follow-button-suggested'
                  onClick={(e) => followFunctionality(currentUser._id, e)}
                >
                  {followStatus[currentUser._id] ? 'Unfollow' : 'Follow'}
                </button>
              </div>
            ))
          ) : (
            <div className="no-users">No suggested users found.</div>
          )}
        </div>
      )}
    </div>
  );
}
