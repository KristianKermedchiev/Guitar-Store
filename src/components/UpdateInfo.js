// import { useState, useEffect } from 'react';
// import app from '../Utils/firebase';
// import { getAuth } from "firebase/auth";
// import { getFirestore, doc, updateDoc } from "firebase/firestore";
// import '../styles/UpdateInfo.css';

// function UpdateInfo() {

//     const [currentUser, setCurrentUser] = useState(null);
//     const [imgSuccess, setImgSuccess] = useState(false);
//     const [usernameSuccess, setUsernameSuccess] = useState(false);
//     const [telephoneSuccess, setTelephoneSuccess] = useState(false);
//     const auth = getAuth(app);
//     const db = getFirestore(app);

//     useEffect(() => {
//         const user = auth.currentUser;
//         if (user) {
//             setCurrentUser(user);
//         }
//     }, [auth.currentUser]);

//     // Function to handle updating the user's profile picture
//     function updateImg(e) {
//         e.preventDefault();
//         const newImgUrl = e.target.elements.imgUrl.value;
//         updateDoc(doc(db, "Users", currentUser.uid), { profileImg: newImgUrl })
//             .then(() => {
//                 console.log("Profile picture updated successfully!");
//                 setImgSuccess(true);
//             })
//             .catch((error) => {
//                 console.error("Error updating profile picture: ", error);
//             });
//     }

//     // Function to handle updating the user's username
//     function updateUsername(e) {
//         e.preventDefault();
//         const newUsername = e.target.elements.username.value;
//         updateDoc(doc(db, "Users", currentUser.uid), { username: newUsername })
//             .then(() => {
//                 console.log("Profile picture updated successfully!");
//                 setUsernameSuccess(true);
//             })
//             .catch((error) => {
//                 console.error("Error updating profile picture: ", error);
//             });
//     }

//     // Function to handle updating the user's telephone
//     function updateTelephone(e) {
//         e.preventDefault();
//         const newTelephone = e.target.elements.telephone.value;
//         updateDoc(doc(db, "Users", currentUser.uid), { telephone: newTelephone })
//             .then(() => {
//                 console.log("Profile picture updated successfully!");
//                 setTelephoneSuccess(true);
//             })
//             .catch((error) => {
//                 console.error("Error updating profile picture: ", error);
//             });
//     }

//     return (
//         <div className="Update-Info">
//             <div className="update-form-box">
//                 <h2 className="image-update-h2">Update Profile Picture</h2>
//                 <form id="ImgUrl" className="update-input-group" onSubmit={updateImg}>
//                     <input type="text" name="imgUrl" className="update-input-field" placeholder="Img Url:" />
//                     <button type="submit" className="update-submit-btn"> Update </button>
//                 </form>
//                 {imgSuccess && <div className="success">Profile picture updated successfully!</div>}
//             </div>

//             <div className="update-form-box">
//                 <h2 className="image-update-h2">Update Username</h2>
//                 <form id="Username" className="update-input-group" onSubmit={updateUsername}>
//                     <input type="text" name="username" className="update-input-field" placeholder="Username:" />
//                     <button type="submit" className="update-submit-btn"> Update </button>
//                 </form>
//                 {usernameSuccess && <div className="success">Username updated successfully!</div>}

//             </div>

//             <div className="update-form-box">
//                 <h2 className="image-update-h2">Update Telephone</h2>
//                 <form id="Telephone" className="update-input-group" onSubmit={updateTelephone}>
//                     <input type="text" name="telephone" className="update-input-field" placeholder="Telephone:" />
//                     <button type="submit" className="update-submit-btn"> Update </button>
//                 </form>
//                 {telephoneSuccess && <div className="success">Telephone updated successfully!</div>}

//             </div>

//         </div>

//     );
// }

// export default UpdateInfo;



import { useState, useEffect } from 'react';
import app from '../Utils/firebase';
import { getAuth } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import '../styles/UpdateInfo.css';
import { validateImgUrl } from '../Utils/ProductValidator';

function UpdateInfo() {

    const [currentUser, setCurrentUser] = useState(null);
    const [imgSuccess, setImgSuccess] = useState(false);
    const [usernameSuccess, setUsernameSuccess] = useState(false);
    const [telephoneSuccess, setTelephoneSuccess] = useState(false);
    const [imgError, setImgError] = useState(null);
    const [usernameError, setUsernameError] = useState(null);
    const [telephoneError, setTelephoneError] = useState(null);
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
                setTimeout(() => {
                    setImgSuccess(false);
                }, 3000);
            })
            .catch((error) => {
                console.error("Error updating profile picture: ", error);
            });
    }
    // Function to handle updating the user's username
    function updateUsername(e) {
        e.preventDefault();
        const newUsername = e.target.elements.username.value;
        if (!newUsername) {
            setUsernameError("Please enter a valid username.");
            setTimeout(() => {
                setUsernameError(null);
            }, 3000); 
            return;
        }
        updateDoc(doc(db, "Users", currentUser.uid), { username: newUsername })
            .then(() => {
                console.log("Username updated successfully!");
                setUsernameSuccess(true);
                setTimeout(() => {
                    setUsernameSuccess(false);
                }, 3000);
            })
            .catch((error) => {
                console.error("Error updating username: ", error);
            });
    }

    // Function to handle updating the user's telephone
    function updateTelephone(e) {
        e.preventDefault();
        const newTelephone = e.target.elements.telephone.value;
        if (!newTelephone || !/^\d{10}$/.test(newTelephone)) {
            setTelephoneError("Please enter a valid 10-digit phone number.");
            setTimeout(() => {
                setTelephoneError(null);
            }, 3000);
            return;
        }
        updateDoc(doc(db, "Users", currentUser.uid), { telephone: newTelephone })
            .then(() => {
                console.log("Telephone updated successfully!");
                setTelephoneSuccess(true);
                setTimeout(() => {
                    setTelephoneSuccess(false);
                }, 3000);
            })
            .catch((error) => {
                console.error("Error updating telephone: ", error);
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

           
           <div className="update-form-box">
              <h2 className="image-update-h2">Update Username</h2>
               <form id="Username" className="update-input-group" onSubmit={updateUsername}>
                    <input type="text" name="username" className="update-input-field" placeholder="Username:" />
                     <button type="submit" className="update-submit-btn"> Update </button>
                </form>
                {usernameError && <div className="username-error">{usernameError}</div>}
                {usernameSuccess && <div className="success">Username updated successfully!</div>}

             </div>

             <div className="update-form-box">
                <h2 className="image-update-h2">Update Telephone</h2>
                 <form id="Telephone" className="update-input-group" onSubmit={updateTelephone}>
                     <input type="text" name="telephone" className="update-input-field" placeholder="Telephone:" />
                     <button type="submit" className="update-submit-btn"> Update </button>
                 </form>
                 {telephoneError && <div className="telephone-error">{telephoneError}</div>}
                 {telephoneSuccess && <div className="success">Telephone updated successfully!</div>}

             </div>
         </div>

    );
}

export default UpdateInfo;