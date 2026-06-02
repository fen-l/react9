import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';

// Импортируем сгенерированное дерево маршрутов
import { routeTree } from './routeTree.gen';

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

function RouterWithAuth() {
    const auth = useAuth();

    React.useEffect(() => {
        router.update({
            context: {
                queryClient,
                auth,
            },
        });
    }, [auth]);

    return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <AuthProvider>
                    <RouterWithAuth />
                </AuthProvider>
            </RecoilRoot>
        </QueryClientProvider>
    </React.StrictMode>
);