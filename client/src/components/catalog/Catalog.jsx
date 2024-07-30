import { useEffect, useState } from "react";
import PostSkeleton from "../Post/postSkeleton";
// import LeftPane from "../leftPane/LeftPane";
// import RightPane from "../rightPane/RightPane";
import './Catalog.css'

export default function Catalog() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/posts/all');
                const postsData = await response.json();
                setPosts(postsData);
                // console.log('fetch posts successful');
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);
    return (
        <>


            {/* <LeftPane /> */}
            <div className="catalog">
                {posts.map(currentPost => <PostSkeleton key={currentPost._id}
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
                    numberOfBookmarks={currentPost.bookmarkedBy.length} />)}
            </div>
            {/* <div className="catalog-right-pane">
                WHO TO FOLLOW SECTION
            </div> */}
            {/* <RightPane /> */}
        </>
    )
}