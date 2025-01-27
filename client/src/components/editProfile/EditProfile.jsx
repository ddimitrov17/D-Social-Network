import { useState } from "react";
import './EditProfile.css'
import { useNavigate } from "react-router-dom";

export default function EditProfile({ onClose, email, username, bio, profilePicture, coverImage, fullName }) {
    const navigate=useNavigate();
    const [profileDetails, SetProfileDetails] = useState({
        email: email,
        username: username,
        fullName: fullName,
        bio: bio,
        profilePicture: profilePicture,
        coverImage: coverImage
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        SetProfileDetails({ ...profileDetails, [name]: value });
    };

    async function createSubmitHandler(e) {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/edit-profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(profileDetails)
            });
            console.log(response)
            if (!response.ok) {
                throw new Error();
            }
            onClose();
            navigate(`/`);
        } catch (error) {
            console.error('There was a problem with editing the profile:', error);
        }
    };
    return (
        <div className="modal-overlay">
            <div className='edit-profile'>
                <button className="close-button" onClick={onClose}>X</button>
                <form className='form' onSubmit={createSubmitHandler}>
                    <input name="email"
                        placeholder="email"
                        className='input'
                        value={profileDetails.email}
                        onChange={handleChange} />
                    <input name="fullName"
                        placeholder="Full Name"
                        className='input'
                        value={profileDetails.fullName}
                        onChange={handleChange} />
                    <input name="username"
                        placeholder="Event Name"
                        className='input'
                        value={profileDetails.username}
                        onChange={handleChange} />
                    <input name="bio"
                        placeholder="Biography"
                        type="text"
                        className='input'
                        value={profileDetails.bio}
                        onChange={handleChange} />
                    <input type="text"
                        className='image'
                        placeholder='Insert profile picture link here...'
                        name='profilePicture'
                        value={profileDetails.profilePicture}
                        onChange={handleChange} />
                    <input type="text"
                        className='image'
                        placeholder='Insert cover image link here...'
                        name='coverImage'
                        value={profileDetails.coverImage}
                        onChange={handleChange} />
                    <button className='button'>Edit Profile</button>
                </form>
            </div>
        </div>
    )
}