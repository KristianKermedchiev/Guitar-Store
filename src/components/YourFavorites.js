import app from '../Utils/firebase';
import { collection, getDocs, getFirestore, doc, getDoc  } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from './Spinner';
import '../styles/Catalog.css';
import '../styles/Spinner.css';

function YourFavorites() {
    const [guitars, setGuitars] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [userFavorites, setUserFavorites] = useState([]);
  
    const db = getFirestore(app);
    const auth = getAuth();
  
    useEffect(() => {
      const fetchUserFavorites = async () => {
        const user = auth.currentUser;
        if (user) {
          const userId = user.uid;
          const userRef = doc(db, "Users", userId);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userFavoritesIds = userDoc.data().likes;
            setUserFavorites(userFavoritesIds);
          }
        }
      };
  
      fetchUserFavorites();
    }, [auth, db]);
  
    useEffect(() => {
      const fetchGuitars = async () => {
        setLoading(true);
        const guitarCollection = collection(db, "Guitars");
        const guitarSnapshot = await getDocs(guitarCollection);
        const guitarData = guitarSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGuitars(guitarData.filter((guitar) => userFavorites.includes(guitar.id)));
        setLoading(false);
      };
  
      fetchGuitars();
    }, [db, userFavorites]);
  
    const handlePreviousClick = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const handleNextClick = () => {
      if (currentPage < Math.ceil(guitars.length / 4)) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const startIndex = (currentPage - 1) * 4;
    const visibleGuitars = guitars.slice(startIndex, startIndex + 4);

    return (
        <div>
          {loading && <Spinner />}
          {guitars.length === 0 ? <div className="nothing"> <h1>Nothing to display</h1></div> : (
            <div className="catalog-container">
              {visibleGuitars.map((guitar) => (
                <div className="catalog-item" key={guitar.id}>
                  <Link to={`/catalog/${guitar.id}`} key={guitar.id}>
                    <img src={guitar.imgUrl} alt={guitar.type}></img>
                    <h3>{guitar.model}</h3>
                  </Link>
                </div>
              ))}
            </div>
          )}
          <div className="pagination">
          <Link to={{ pathname: `/profile/` }}>
                                    <button>Back</button>
                                </Link>
            <button onClick={handlePreviousClick} disabled={currentPage === 1}>
              Previous
            </button>
            <p>Current Page: {currentPage}</p>
            <button
              onClick={handleNextClick}
              disabled={currentPage === Math.ceil(guitars.length / 4) ||Math.ceil(guitars.length / 4) === 0 }
            >
              Next
            </button>
          </div>
        </div>
      );
}

export default YourFavorites;
