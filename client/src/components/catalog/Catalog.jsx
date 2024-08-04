import { useEffect, useState } from "react";
import PostSkeleton from "../Post/postSkeleton";
import './Catalog.css'
import Spinner from "../../loadingSpinner/Spinner";

export default function Catalog() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/posts/all');
                const postsData = await response.json();
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
            <div className="catalog">
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
