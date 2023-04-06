import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Catalog from './Catalog';
import Register from './Register';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Details from './Details';
import ErrorPage from './ErrorPage';


function PublicRouter() {

	return (

				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/catalog" element={<Catalog />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/profile" element={<Login />} />
					<Route path="/create" element={<Login />} />
					<Route path="/aboutUs" element={<AboutUs />} />
					<Route path="/contactUs" element={<ContactUs />} />
					<Route path="/catalog/:id" element={<Details />} />
					<Route path="/catalog/:id/edit" element={<Login />} />
					<Route path="/profile/updateInfo" element={<Login />} />
					<Route path="/profile/yourFavorites" element={<Login />} />
					<Route path="/profile/yourPosts" element={<Login />} />
					<Route path="/pageNotFound" element={<ErrorPage />} />

				</Routes>
		
	);
}

export default PublicRouter;

