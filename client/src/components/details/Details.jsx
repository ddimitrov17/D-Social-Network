import { React, useEffect, useState } from 'react';
import PostSkeleton from '../Post/postSkeleton';
import { useParams } from 'react-router-dom';
import PostReply from '../postReply/PostReply';
import Spinner from '../../loadingSpinner/Spinner';
import { useSelector } from 'react-redux';

export default function Details() {
    const user = useSelector((state) => state.user.currentUser);
    const { id } = useParams();
    const [postDetails, setPostDetails] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        async function fetchPostDetails() {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}`);
                const data = await response.json();
                setPostDetails(data);
            } catch (error) {
                console.log('Error while getting the details for this post');
            } finally {
                setLoading(false); 
            }
        }
        fetchPostDetails();
    }, [id]);

    console.log(postDetails);

    return (
        <>
            <div>
                {loading ? ( 
                    <Spinner /> 
                ) : (
                    postDetails && (
                        <PostSkeleton
                            detailsPageToggle={true}
                            postId={id}
                            text={postDetails.text}
                            fullName={postDetails.user?.fullName}
                            username={postDetails.user?.username}
                            image={postDetails.img}
                            numberOfComments={postDetails.comments?.length}
                            numberOfLikes={postDetails.likes?.length}
                            authorProfilePicture={postDetails.user.profilePicture}
                            numberOfBookmarks={postDetails.bookmarkedBy?.length}
                            authorId={postDetails.user._id}
                        />
                    )
                )}

                <PostReply postId={id} />
                {postDetails?.comments.reverse().map(currentComment => (
                    <PostSkeleton
                        text={currentComment.text}
                        key={currentComment._id}
                        fullName={currentComment.user.fullName}
                        username={currentComment.user.username}
                        detailsPageToggle={true}
                        image={currentComment.img}
                        commentToggle={true}
                        authorProfilePicture={currentComment.user.profilePicture}
                    />
                ))}
            </div>
        </>
    );
}
