import Spinner from "../../loadingSpinner/Spinner";
import PostSkeleton from "../Post/postSkeleton";
import { useSelector } from "react-redux";

export default function Bookmarks() {
    const user = useSelector(state => state.user.currentUser);
    if (!user) {
        return <Spinner />; 
    }
    return (
        <div className="bookmarks-section">
            {user.bookmarks && user.bookmarks.map(currentBookmark => (
                <PostSkeleton
                    key={currentBookmark._id}
                    text={currentBookmark.text}
                    image={currentBookmark?.img}
                    username={currentBookmark.user.username}
                    fullName={currentBookmark.user.fullName}
                    postId={currentBookmark._id}
                    detailsPageToggle={false}
                    commentToggle={false}
                    numberOfLikes={currentBookmark.likes.length}
                    numberOfComments={currentBookmark.comments.length}
                    authorProfilePicture={currentBookmark.user.profilePicture}
                    numberOfBookmarks={currentBookmark.bookmarkedBy.length}
                />
            ))}
        </div>
    );
}
