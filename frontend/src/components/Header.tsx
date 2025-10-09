import { MdMenu } from 'react-icons/md';

interface HeaderProps {
    onToggleSidebar: () => void;
}

export const Header = ({ onToggleSidebar }: HeaderProps) => {
    return (
        <header className='flex items-center h-16 justify-between p-3 bg-indigo-600 text-slate-50 shadow-lg'>
            <button className='text-3xl cursor-pointer' onClick={onToggleSidebar}>
                <MdMenu />
            </button>
            <h1 className='text-center font-semibold'>
                SISTEMA DE GESTIÓN DE COMERCIO
            </h1>
        </header>
    );
};
