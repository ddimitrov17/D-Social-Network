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
            console.log(data)
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div className='explore'>
            <div className="search-section">
                <div className='search-panel'>
                    <form className="search-form">
                        <input type="text"
                            className='search-input'
                            placeholder='Search Posts...'
                            onChange={searchHandler} />
                    </form>
                </div>
            </div>
            <div className='people-matches'>
                {searchResults.users && searchResults.users.map(currentUser => (
                    <UserMatch
                        key={currentUser._id}
                        profilePicture={currentUser.profilePicture}
                        fullName={currentUser.fullName}
                        username={currentUser.username} />
                ))}
            </div>
            <div className='post-matches'>
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
            </div>
        </div>
    );
}
