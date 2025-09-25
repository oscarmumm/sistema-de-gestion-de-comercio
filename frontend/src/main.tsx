import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import {AppRouter} from './router/AppRouter.tsx';
import {AuthProvider} from './context/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    </StrictMode>
);
