import React, { useState, useEffect } from 'react';
import app from '../Utils/firebase';
import { getAuth } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';
import { getFirestore, doc, getDoc } from "firebase/firestore";

import '../styles/Profile.css';

function Profile() {

  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [likes, setLikes] = useState(0);
  const [posts, setPosts] = useState(0);
  const auth = getAuth(app);
  const navigate = useNavigate();
  const db = getFirestore(app);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email);

      const docRef = doc(db, "Users", user.uid);
      getDoc(docRef)
        .then((doc) => {
          if (doc.exists()) {
            const data = doc.data();
            console.log(doc.data())
            setUsername(data.username);
            setProfilePicture(data.profileImg)
            setTelephone(data.telephone);
            setLikes(data.likes);
            setPosts(data.posts);
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    } else {
      navigate('/login');
    }
  }, [auth, db, navigate]);

  return (
    <div className="profile">
      <div className="profile-header">
        {profilePicture ? <img src={profilePicture} alt="https://via.placeholder.com/150" /> :
        <img src="https://via.placeholder.com/150" alt="https://via.placeholder.com/150" />}
      </div>
      <h1 className="profile-h1">Welcome to your profile page {username}</h1>
      <div className="profile-info">
        <p>Email: {email}</p>
        <p>Telephone: {telephone}</p>
        <p>Favorites: {likes.length}</p>
        <p>Posts: {posts.length}</p>
      </div>
      <div className="profile-button-container">
        <Link to="/profile/updateInfo" className="profile-button">Update your info</Link>
        <Link to="/profile/yourFavorites" className="profile-button">Favorite Guitars</Link>
        <Link to="/profile/yourPosts" className="profile-button">Your Posts</Link>
      </div>
    </div>
  );
}
export default Profile;