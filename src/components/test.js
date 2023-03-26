import { useState, useEffect } from 'react';
import app from '../Utils/firebase';
import { getAuth } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import '../styles/UpdateInfo.css';
import { validateImgUrl } from '../Utils/ProductValidator';

function UpdateInfo() {

    const [currentUser, setCurrentUser] = useState(null);
    const [imgSuccess, setImgSuccess] = useState(false);
    const [imgError, setImgError] = useState(null);
    const auth = getAuth(app);
    const db = getFirestore(app);

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setCurrentUser(user);
        }
    }, [auth.currentUser]);

    // Function to handle updating the user's profile picture
    function updateImg(e) {
        e.preventDefault();
        const newImgUrl = e.target.elements.imgUrl.value;
        const result = validateImgUrl(newImgUrl);
        if (!newImgUrl || !result) {
            setImgError("Please enter a valid image URL.");
            setTimeout(() => {
                setImgError(null);
            }, 3000); 
            return;
        }
        updateDoc(doc(db, "Users", currentUser.uid), { profileImg: newImgUrl })
            .then(() => {
                console.log("Profile picture updated successfully!");
                setImgSuccess(true);
            })
            .catch((error) => {
                console.error("Error updating profile picture: ", error);
            });
    }

    return (
        <div className="Update-Info">
            <div className="update-form-box">
                <h2 className="image-update-h2">Update Profile Picture</h2>
                <form id="ImgUrl" className="update-input-group" onSubmit={updateImg}>
                    <input type="text" name="imgUrl" className="update-input-field" placeholder="Img Url:" />
                    <button type="submit" className="update-submit-btn"> Update </button>
                </form>
                {imgError && <div className="imgUrl-error">{imgError}</div>}
                {imgSuccess && <div className="success">Profile picture updated successfully!</div>}
            </div>
         </div>
    );
}

export default UpdateInfo;