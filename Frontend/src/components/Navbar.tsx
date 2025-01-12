import { Link } from '@tanstack/react-router';
import { getCurrentUser, isLoggedIn, loginUser, logoutUser } from '../services/authServices';

const Navbar = () => {
    const currentUser = getCurrentUser();
    const loggedIn = isLoggedIn();

    const handleLogin = () => {
        const username = prompt("Enter your username:");
        if (username) {
            loginUser(username);
            window.location.reload();
        }
    };

    const handleLogout = () => {
        logoutUser();
        window.location.reload();
    };

    return (
        <nav>
            <Link to="/">Home</Link> | 
            <Link to="/wishlist">Wish List</Link> | 
            <Link to="/statistics">Statistics</Link> | 

            {loggedIn ? (
                <>
                    <span>Logged in as: {currentUser} </span>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <button onClick={handleLogin}>Login</button>
            )}
        </nav>
    );
};

export default Navbar;
