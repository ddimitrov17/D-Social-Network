import { useEffect, useState } from 'react';
import './home.css';
import PostSkeleton from '../Post/postSkeleton';
import Spinner from '../../loadingSpinner/Spinner';

export default function Home() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true); 

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await fetch('http://localhost:5000/api/posts/home/top');
				const postsData = await response.json();
				setPosts(postsData);
				// console.log('fetch posts successful');
			} catch (error) {
				console.error('Error fetching posts:', error);
			} finally {
				setLoading(false); 
			}
		};

		fetchPosts();
	}, []);

	return (
		<div className="home">
			<div className='home-main-content'>
				<div className='home-header'>
					<div className='home-tab'>Most liked posts</div>
				</div>
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
							numberOfComments={currentPost.comments.length}
							numberOfLikes={currentPost.likes.length}
							authorProfilePicture={currentPost.user.profilePicture}
							numberOfBookmarks={currentPost.bookmarkedBy.length}
						/>
					))
				)}
			</div>
		</div>
	);
}
