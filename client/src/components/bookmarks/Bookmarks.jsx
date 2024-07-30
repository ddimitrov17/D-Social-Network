import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import PostSkeleton from "../Post/postSkeleton";

export default function Bookmarks() {
    const { user } = useContext(UserContext);
    console.log(user.bookmarks);
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
