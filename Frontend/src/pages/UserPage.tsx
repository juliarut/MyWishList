
import { useParams } from '@tanstack/react-router';

const UserPage = () => {
    const { id } = useParams({ strict: false });

    return (
        <div>
            <h1>User Page</h1>
            <p>Welcome, user ID: {id}</p>
        </div>
    );
};

export default UserPage;
