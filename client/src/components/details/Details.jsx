import { React, useEffect, useState } from 'react';
import PostSkeleton from '../Post/postSkeleton';
import { useNavigate, useParams } from 'react-router-dom';
import PostReply from '../postReply/PostReply';

export default function Details() {
    const { id } = useParams();
    const [postDetails, setPostDetails] = useState(null);
    useEffect(() => {
        async function fetchPostDetails() {
            try {
                const response = await fetch(`http://localhost:5000/api/posts/${id}`);
                const data = await response.json();
                setPostDetails(data);
            } catch (error) {
                console.log('Error while getting the details for this post');
            }
        };
        fetchPostDetails();
    }, [id]);
    console.log(postDetails)
    return (
        <>
            <div>
                {postDetails && (
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
                    />
                )}

                <PostReply postId={id} />
                {postDetails?.comments.reverse().map(currentComment => (
                    <PostSkeleton text={currentComment.text}
                        key={currentComment._id}
                        fullName={currentComment.user.fullName}
                        username={currentComment.user.username}
                        detailsPageToggle={true}
                        image={currentComment.img}
                        commentToggle={true} />
                ))}
            </div>
        </>
    )
}