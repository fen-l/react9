import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';

// Импортируем сгенерированное дерево маршрутов
import { routeTree } from './routeTree.gen';

// Импортируем стили для темы
import '@/styles/theme.css';

// Импортируем провайдеры
import { AuthProvider, useAuth } from './contexts/AuthContext';
import type { AuthContextType } from './contexts/AuthContext';
import { queryClient } from './queryClient';


// Создаем роутер
const router = createRouter({
    routeTree,
    context: {
        queryClient,
        auth: undefined! as AuthContextType,
    },
});

function AppRouter() {
    const auth = useAuth();

    return (
        <RouterProvider
            router={router}
            context={{ auth, queryClient }}
        />
    );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <AuthProvider>
                    <AppRouter />
                </AuthProvider>
            </RecoilRoot>
        </QueryClientProvider>
    </React.StrictMode>
);