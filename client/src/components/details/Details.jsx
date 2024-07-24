import { React, useEffect, useState } from 'react';
import PostSkeleton from '../Post/postSkeleton';
import { useParams } from 'react-router-dom';
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
                <PostSkeleton detailsPageToggle={true}
                    text={postDetails?.text}
                    fullName={postDetails?.user?.fullName}
                    username={postDetails?.user?.username}
                    image={postDetails?.img}
                />
                <PostReply/>
            </div>
        </>
    )
}