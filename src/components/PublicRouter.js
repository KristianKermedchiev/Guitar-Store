import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Catalog from './Catalog';
import Register from './Register';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Details from './Details';


function PublicRouter() {

	return (

				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/catalog" element={<Catalog />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/profile" element={<Login />} />
					<Route path="/create" element={<Login />} />
					<Route path="/about-us" element={<AboutUs />} />
					<Route path="/contact-us" element={<ContactUs />} />
					<Route path="/catalog/:id" element={<Details />} />
					<Route path="/catalog/:id/edit" element={<Login />} />
					<Route path="/profile/change-info" element={<Login />} />
					<Route path="/profile/your-favorites" element={<Login />} />
					<Route path="/profile/your-posts" element={<Login />} />
				</Routes>
		
	);
}

export default PublicRouter;

