import React, { useState } from 'react';
import app from '../Utils/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
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
    <div className="profile-container">
      <div className="profile-header">
        <h1>Welcome John Doe!</h1>
        <img src="https://via.placeholder.com/150" alt="profile picture" />
      </div>
      <div className="profile-body">
        <div className="profile-info">
          <h2>About</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id orci eu enim malesuada lobortis. Sed vel velit purus.</p>
        </div>
        <div className="profile-skills">
          <h2>Skills</h2>
          <ul>
            <li>JavaScript</li>
            <li>React</li>
            <li>HTML</li>
            <li>CSS</li>
          </ul>
        </div>
      </div>
    </div>
  );

}
export default Profile;