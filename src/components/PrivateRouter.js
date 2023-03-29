import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Catalog from './Catalog';
import Create from './Create';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Profile from './Profile';
import Details from './Details';
import Edit from './Edit';
import UpdateInfo from './UpdateInfo';
import YourFavorites from './YourFavorites';
import YourPosts from './YourPosts';
import ErrorPage from './ErrorPage';


function PrivateRouter() {

	return (

				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/catalog" element={<Catalog />} />
					<Route path="/register" element={<Home />} />
					<Route path="/login" element={<Home />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/create" element={<Create />} />
					<Route path="/aboutUs" element={<AboutUs />} />
					<Route path="/contactUs" element={<ContactUs />} />
					<Route path="/pageNotFound" element={<ErrorPage />} />
					<Route path="*" element={<Navigate to="/" replace />} />
					<Route path="/catalog/:id" element={<Details />} />
					<Route path="/catalog/:id/edit" element={<Edit />} />
					<Route path="/profile/updateInfo" element={<UpdateInfo />} />
					<Route path="/profile/yourFavorites" element={<YourFavorites />} />
					<Route path="/profile/yourPosts" element={<YourPosts />} />
				</Routes>
		
	);
}
export default PrivateRouter;
