import { Link } from '@tanstack/react-router';
import { getCurrentUser, isLoggedIn } from '../services/authServices.ts';

const Navbar = () => {
    const currentUser = getCurrentUser();
    const loggedIn = isLoggedIn();

    return (
        <nav>
            <Link to="/">Home</Link> | 
            <Link to="/wishlist">Wish List</Link> | 
            <Link to="/statistics">Statistics</Link> | 
            
            {loggedIn ? (
                <>
                    <span>Logged in as: {currentUser}</span>
                    <Link to="/">Logout</Link>
                </>
            ) : (
                <Link to="/?loggedin=TestUser">Login</Link>
            )}
        </nav>
    );
};
export default Navbar;
