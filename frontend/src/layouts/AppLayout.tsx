import { useState } from 'react';
import { Outlet } from 'react-router';
import { Header } from '../components/Header';
import Sidebar from '../components/Sidebar';
import { AnimatePresence, motion } from 'motion/react';

const sideBarAnimations = {
    visible: {
        opacity: 1,
    },
    hidden: {
        opacity: 0,
    },
};

export const AppLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return (
        <div className="flex min-h-screen">
            <AnimatePresence>
                {isSidebarOpen ? (
                    <motion.div>
                        <Sidebar />
                    </motion.div>
                ) : null}
            </AnimatePresence>
            <div className="flex flex-col flex-1">
                <Header onToggleSidebar={toggleSidebar} />
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
