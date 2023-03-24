import { Routes, Route } from 'react-router-dom';
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


function PrivateRouter() {

	return (

				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/catalog" element={<Catalog />} />
					<Route path="/register" element={<Home />} />
					<Route path="/login" element={<Home />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/create" element={<Create />} />
					<Route path="/about-us" element={<AboutUs />} />
					<Route path="/contact-us" element={<ContactUs />} />
					<Route path="/catalog/:id" element={<Details />} />
					<Route path="/catalog/:id/edit" element={<Edit />} />
					<Route path="/profile/change-info" element={<UpdateInfo />} />
					<Route path="/profile/your-favorites" element={<YourFavorites />} />
					<Route path="/profile/your-posts" element={<YourPosts />} />
				</Routes>
		
	);
}
export default PrivateRouter;
