
import { Link } from '@tanstack/react-router';
import { getCurrentUser, isLoggedIn } from '../services/authServices';

const Navbar = () => {
    const currentUser = getCurrentUser();
    const loggedIn = isLoggedIn();

    return (
        <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
            <div className="text-lg font-bold">Wish List App</div>
            <div className="space-x-4">
                <Link to="/" className="hover:underline">Home</Link>
                <Link to="/wishlist" className="hover:underline">Wish List</Link>
                <Link to="/statistics" className="hover:underline">Statistics</Link>
            </div>
            <div>
                {loggedIn ? (
                    <span>Welcome, {currentUser}</span>
                ) : (
                    <Link to="/?loggedin=TestUser" className="text-yellow-300 hover:underline">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
