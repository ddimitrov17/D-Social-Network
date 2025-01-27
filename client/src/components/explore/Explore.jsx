import { useState } from 'react';
import './Explore.css';
import PostSkeleton from '../Post/postSkeleton';
import UserMatch from './UserMatch';

export default function Explore() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const searchHandler = async (e) => {
        const newQuery = e.target.value;
        // console.log(newQuery)
        setSearchQuery(newQuery);

        if (!newQuery.trim()) {
            setSearchResults([]);
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts/explore?query=${newQuery}`, {
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
            // console.log(data)
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div className='explore'>
            <div className='search-panel'>
                    <input type="text"
                        className='search-input'
                        placeholder='Search Posts...'
                        onChange={searchHandler} />
            </div>
            { searchResults?.users?.length > 0 && (<div className='people-matches'>
                { (searchQuery.length > 0 && searchResults?.users?.length > 0) && (<h3 className='mini-heading-people'>People</h3>)}
                {searchResults.users && searchResults.users.map(currentUser => (
                    <UserMatch
                        key={currentUser._id}
                        profilePicture={currentUser.profilePicture}
                        fullName={currentUser.fullName}
                        username={currentUser.username} />
                ))}
            </div>)}
            { searchResults?.posts?.length > 0 && (<div className='post-matches'>
            { (searchQuery.length > 0 && searchResults?.posts?.length > 0) && (<h3 className='mini-heading-posts'>Posts</h3>)}
                {searchResults.posts && searchResults.posts.map(currentPost => (
                    <PostSkeleton
                        key={currentPost._id}
                        text={currentPost.text}
                        image={currentPost.img}
                        username={currentPost.user.username}
                        fullName={currentPost.user.fullName}
                        postId={currentPost._id}
                        detailsPageToggle={false}
                        commentToggle={false}
                        numberOfComments={currentPost.comments.length}
                        numberOfLikes={currentPost.likes.length}
                        numberOfBookmarks={currentPost.bookmarkedBy.length}
                    />
                ))}
            </div>)}
        </div>
    );
}
