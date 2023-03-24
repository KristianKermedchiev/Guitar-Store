import React, { useState } from 'react';
import app from '../Utils/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';

import '../styles/Profile.css';

function Profile() {

    const [username, setUsername] = useState('');
    const auth = getAuth(app);
    const navigate = useNavigate();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUsername(user.email);
        } else {
            navigate('/login');
        }
    });
    return (
        <div className="profile">
            <div className="profile-header">
                <img src="https://via.placeholder.com/150" alt="profile picture" />
            </div>
            <h1 className="profile-h1">Welcome to your profile page {username}</h1>
            <div className="profile-info">
                <p>Email: AAAAA@ABV.BG</p>
                <p>Telephone: 0888888888</p>
                <p>Likes: 5</p>
                <p>Posts: 2</p>
            </div>
            <div className="profile-button-container">
                <Link to="/catalog" className="profile-button">Update your info</Link>
                <Link to="/catalog" className="profile-button">Liked Guitars</Link>
                <Link to="/catalog" className="profile-button">Your Posts</Link>
            </div>
        </div>
    );


}
export default Profile;