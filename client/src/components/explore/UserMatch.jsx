import { Link } from 'react-router-dom'
import './UserMatch.css'

export default function UserMatch({ profilePicture, username, fullName}) {
    return (
        <Link to={`/profile/${username}`}>
            <button className='user-match'>
                <div className='user-match-credentials'>
                    <img src={profilePicture} alt="Profile Picture" />
                    <div className='user-match-details'>
                        <div className='user-match-fullname'>{fullName}</div>
                        <div className='user-match-username'>@{username}</div>
                    </div>
                </div>
            </button>
        </Link>
    )
}