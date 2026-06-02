import * as React from 'react';
import { Outlet, createRootRouteWithContext, Link, useNavigate } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import {useRecoilValue, useRecoilCallback, useRecoilState} from 'recoil';
import { cartCountState } from '@/state/selectors';
import { cartState } from '@/state/cartState';
import { favoritesState } from '@/state/favoritesState';
import { uiSettingsState } from '@/state/uiSettingsState';
import { type RouterContext } from '@/router-context'

export const Route = createRootRouteWithContext<RouterContext>()({
    component: RootComponent,
});

function RootComponent() {
    const { state, dispatch } = useAuth();
    const navigate = useNavigate();
    const cartCount = useRecoilValue(cartCountState);
    const favoritesCount = useRecoilValue(favoritesState).length;
    const resetAll = useRecoilCallback(({ reset }) => () => {
        reset(cartState);
        reset(favoritesState);
        reset(uiSettingsState);
    });
    const [uiSettings] = useRecoilState(uiSettingsState);

    const handleLogout = () => {
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
        navigate({ to: '/' });
    };

    React.useEffect(() => {
        document.body.classList.remove('theme-light', 'theme-dark');
        document.body.classList.add(
            uiSettings.theme === 'dark' ? 'theme-dark' : 'theme-light'
        );
    }, [uiSettings.theme]);

    // Получаем сохраненные параметры каталога
    const catalogSearchParams = React.useMemo(() => {
        const saved = localStorage.getItem('catalog_search_params');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                return {};
            }
        }
        return {};
    }, []);

    return (
        <React.Fragment>
            <div
                style={{
                    maxWidth: 1200,
                    margin: '0 auto',
                    padding: '20px',
                    background: 'var(--bg)',
                    color: 'var(--text)',
                    minHeight: '100vh',
                }}
            >
                {/* Navbar */}
                <div style={{
                    display: 'flex',
                    gap: '20px',
                    marginBottom: '30px',
                    padding: '10px',
                    borderBottom: '1px solid var(--border)',
                    background: 'var(--bg)',
                    color: 'var(--text)',
                }}>
                    <Link
                        to="/"
                        activeProps={{ style: { fontWeight: 'bold', color: 'var(--primary)' } }}
                        style={{ textDecoration: 'none', color: 'var(--text)' }}
                    >
                        Главная
                    </Link>

                    {state.isAuthenticated ? (
                        <>
                            <Link
                                to="/catalog"
                                search={catalogSearchParams}
                                activeProps={{ style: { fontWeight: 'bold', color: 'var(--primary)' } }}
                                style={{ textDecoration: 'none', color: 'var(--text)' }}
                            >
                                Каталог
                            </Link>
                            <Link
                                to="/cart"
                                style={{ textDecoration: 'none', color: 'var(--text)', position: 'relative' }}
                            >
                                Корзина
                                {cartCount > 0 && (
                                    <span style={{
                                        marginLeft: 6,
                                        background: 'var(--primary)',
                                        color: 'white',
                                        borderRadius: 10,
                                        padding: '2px 6px',
                                        fontSize: 12
                                    }}>
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            <Link
                                to="/favorites"
                                style={{ textDecoration: 'none', color: 'var(--text)', position: 'relative' }}
                            >
                                ❤️
                                {favoritesCount > 0 && (
                                    <span style={{
                                        marginLeft: 6,
                                        background: 'var(--primary)',
                                        color: 'white',
                                        borderRadius: 10,
                                        padding: '2px 6px',
                                        fontSize: 12
                                    }}>
                                        {favoritesCount}
                                    </span>
                                )}
                            </Link>
                            <Button
                                variant="secondary"
                                size="small"
                                onClick={resetAll}
                            >
                                Сбросить настройки
                            </Button>
                            <div style={{ flex: 1 }} />
                            <span style={{ color: '#666', fontSize: '14px' }}>
                                {state.user?.username}
                            </span>
                            <Button
                                variant="secondary"
                                size="small"
                                onClick={handleLogout}
                            >
                                Выйти
                            </Button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            activeProps={{ style: { fontWeight: 'bold', color: 'var(--primary)' } }}
                            style={{ textDecoration: 'none', color: 'var(--text)' }}
                        >
                            Войти
                        </Link>
                    )}
                </div>

                {/* Контент страниц */}
                <Outlet />
            </div>

            {/* DevTools только в разработке */}
            {import.meta.env.DEV && <TanStackRouterDevtools />}
        </React.Fragment>
    );
}