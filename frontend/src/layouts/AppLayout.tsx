import { useState } from 'react';
import { Outlet } from 'react-router';
import { Header } from '../components/Header';
import Sidebar from '../components/Sidebar';

export const AppLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return (
        <div className='flex min-h-screen'>
            {isSidebarOpen ? <Sidebar /> : null}
            <div className='flex flex-col flex-1'>
                <Header onToggleSidebar={toggleSidebar} />
                <main className='flex-1 p-6'>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
