import { useEffect, useState } from "react";
import PostSkeleton from "../Post/postSkeleton";
import './PersonalFeed.css'
import Spinner from "../../loadingSpinner/Spinner";

export default function PersonalFeed() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts/following`, {
                    method: 'GET',
                    credentials: 'include', 
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                const postsData = await response.json();
                console.log(postsData);
                setPosts(postsData);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchPosts();
    }, []);
    

    return (
        <>
            <div className="personal-feed">
                {loading ? ( 
                    <Spinner /> 
                ) : (
                    posts.map(currentPost => (
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
                            // authorId={currentPost.user._id}
                        />
                    ))
                )}
            </div>
        </>
    );
}
