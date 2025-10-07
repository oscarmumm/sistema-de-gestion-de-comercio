import { useState } from 'react';
import { Outlet } from 'react-router';
import { Header } from '../components/Header';
import Sidebar from '../components/Sidebar';
import { motion } from 'motion/react';

const sideBarVariants = {
    hidden: { opacity: 0, marginLeft: -256 },
    visible: { opacity: 1, marginLeft: 0 },
    transition: {
        type: 'tween',
    },
};

export const AppLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header onToggleSidebar={toggleSidebar} />
            <div className="flex flex-1">
                <motion.div
                    className="w-64"
                    variants={sideBarVariants}
                    animate={isSidebarOpen ? 'hidden' : 'visible'}
                    transition={{ type: 'tween' }}>
                    <Sidebar />
                </motion.div>
                <main className="p-6 flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
