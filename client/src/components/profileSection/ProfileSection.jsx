import { useEffect, useState } from 'react';
import './ProfileSection.css';
import { useParams } from 'react-router-dom';
import PostSkeleton from '../Post/postSkeleton';
import { useSelector } from 'react-redux';
import Spinner from '../../loadingSpinner/Spinner';
import { editSVG } from '../Post/postSVG';
import EditProfile from '../editProfile/EditProfile';
import { FaPen } from "react-icons/fa";

export default function ProfileSection() {
    const user = useSelector(state => state.user.currentUser);
    const { username } = useParams();
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // edit Profile
    const [followedByUser, setFollowedByUser] = useState(false);

    function editProfileHandler() {
        setIsModalOpen(true);
    }
    function closeModalHandler() {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/posts/profile/${username}`);
                const postsData = await response.json();
                setUserPosts(postsData.posts);
                setUserData(postsData.userData);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserPosts();
    }, [username]);

    useEffect(() => {
        if (!userData || !userData._id) {
            return;
        }

        async function fetchFollowingStatus() {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:5000/api/user/follow-status/${userData._id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch follow status');
                }
                const { followed } = await response.json();
                setFollowedByUser(followed);
            } catch (error) {
                console.error('Error fetching follow status:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchFollowingStatus();
    }, [userData]);

    async function followFunctionality(e) {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/user/follow/${userData._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify()
            });

            if (!response.ok) {
                throw new Error('Failed to update follow status');
            }

            const { followed } = await response.json();
            setFollowedByUser(followed);
            console.log('User followed/unfollowed successfully!');
        } catch (error) {
            console.error('There was a problem with the follow functionality:', error);
        }
    }

    if (loading || !user) {
        return <Spinner />;
    }

    return (
        <div className='profile-page'>
            <div className='profile-section'>
                <div className='cover-image'>
                    <img src={userData.coverImage} alt="Cover Image" />
                </div>
                <div className='lower-section'>
                    <div className='profile-picture-insection'>
                        <img src={userData.profilePicture} alt="Profile Picture" />
                    </div>
                    <div className='user-credentials'>
                        <div className='user-info'>
                            <div className='user-fullname'>{userData.fullName}</div>
                            <div className='user-username'>{userData.username ? `@${userData.username}` : ''}</div>
                        </div>
                        <div className='user-bio'>
                            <p>{userData.bio}</p>
                        </div>
                        {user._id === userData._id && (
                            <button className='edit-profile-button' onClick={editProfileHandler}>
                                <FaPen />
                            </button>
                        )}
                        {user._id !== userData._id && (
                            <button className='follow-button' onClick={followFunctionality}>
                                {followedByUser ? 'Unfollow' : 'Follow'}
                            </button>
                        )}
                    </div>
                </div>
                <div className='prof-buttons'>
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
                {isModalOpen && (
                    <EditProfile
                        onClose={closeModalHandler}
                        email={user.email}
                        fullName={user.fullName}
                        username={user.username}
                        profilePicture={user.profilePicture}
                        coverImage={user.coverImage}
                        bio={user.bio}
                    />
                )}
            </div>
        </div>
    );
}
