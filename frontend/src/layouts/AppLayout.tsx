import { useState } from 'react';
import { Outlet } from 'react-router';
import { Header } from '../components/Header';
import Sidebar from '../components/Sidebar';
import { AnimatePresence, motion } from 'motion/react';

const sideBarVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    transition: {
        type: 'tween'
    }
};

export const AppLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return (
        <div>
            <Header onToggleSidebar={toggleSidebar} />
            <AnimatePresence>
                {isSidebarOpen ? (
                    <motion.div
                        variants={sideBarVariants}
                        initial='hidden'
                        animate='visible'
                        exit='hidden'
                        transition={{type: 'tween'}}
                        className='absolute top-0'
                    >
                        <Sidebar onToggleSidebar={toggleSidebar} />
                    </motion.div>
                ) : null}
            </AnimatePresence>
            <main className='p-6'>
                <Outlet />
            </main>
        </div>
    );
};
