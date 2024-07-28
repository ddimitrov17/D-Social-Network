import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import './ProfileSection.css'

export default function ProfileSection() {
    const { user } = useContext(UserContext);
    console.log(user);
    return (
        <div className='profile-page'>
            <div className='profile-section'>
                <div className='cover-image'>
                    <img src={user.coverImage} alt="Cover Image" />
                </div>
                <div className='profile-picture'>
                    <img src={user.profilePicture} alt="Profile Picture" />
                </div>
                <div className='user-credentials'>
                    <div className='user-fullname'>{user.fullName}</div>
                    <div className='user-username'>{user.username ? `@${user.username}` : ''}</div>
                </div>
                <div className='buttons'>
                <button className='posts-button'>Posts</button>
                <button className='likes-button'>Likes</button>
                </div>
            </div>
        </div>
    )
}