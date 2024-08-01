import { useEffect, useState } from 'react';
import './ProfileSection.css';
import { useParams } from 'react-router-dom';
import PostSkeleton from '../Post/postSkeleton';
import { useSelector } from 'react-redux';
import Spinner from '../../loadingSpinner/Spinner';

export default function ProfileSection() {
    const user = useSelector(state => state.user.currentUser);
    const { username } = useParams();
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true); 
    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/posts/profile/${username}`);
                const postsData = await response.json();
                setUserPosts(postsData);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false); 
            }
        };

        fetchUserPosts();
    }, [username]); 

    if (loading || !user) {
        return <Spinner />; 
    }

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
            <div className='user-posts'>
                {userPosts.map(currentPost => (
                    <PostSkeleton 
                        key={currentPost._id}
                        text={currentPost.text}
                        image={currentPost?.img}
                        username={currentPost.user.username}
                        fullName={currentPost.user.fullName}
                        postId={currentPost._id}
                        detailsPageToggle={false}
                        commentToggle={false}
                        numberOfLikes={currentPost.likes.length}
                        numberOfComments={currentPost.comments.length}
                        authorProfilePicture={currentPost.user.profilePicture}
                        numberOfBookmarks={currentPost.bookmarkedBy.length} 
                    />
                ))}
            </div>
        </div>
    )
}
