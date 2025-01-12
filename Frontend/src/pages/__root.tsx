// src/pages/__root.tsx
import { Outlet } from '@tanstack/react-router';
import Navbar from '../components/Navbar';

const RootPage = () => {
    return (
        <div>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default RootPage;
