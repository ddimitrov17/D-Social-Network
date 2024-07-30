import { useEffect, useState } from 'react';
import './home.css';
import PostSkeleton from '../Post/postSkeleton';

export default function Home() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await fetch('http://localhost:5000/api/posts/home/top');
				const postsData = await response.json();
				setPosts(postsData);
				// console.log('fetch posts successful');
			} catch (error) {
				console.error('Error fetching posts:', error);
			}
		};

		fetchPosts();
	}, []);
	// console.log(posts);
	return (
		<div className="home">
			<>
				<div className='home-main-content'>
					<div className='home-header'>
						<div className='home-tab'>Most liked posts</div>
					</div>
					{posts && (posts.map(currentPost => <PostSkeleton key={currentPost._id}
						text={currentPost.text}
						image={currentPost?.img}
						username={currentPost.user.username}
						fullName={currentPost.user.fullName}
						postId={currentPost._id}
						detailsPageToggle={false}
						commentToggle={false}
						numberOfComments={currentPost.comments.length}
						numberOfLikes={currentPost.likes.length}
						authorProfilePicture={currentPost.user.profilePicture}
						numberOfBookmarks={currentPost.bookmarkedBy.length} />))}
				</div>
			</>
		</div>
	);
}

