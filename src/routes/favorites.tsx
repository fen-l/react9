import { createFileRoute } from '@tanstack/react-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { favoritesState } from '../state/favoritesState';
import { cartState } from '../state/cartState';
import { favoritesProductsSelector } from '../state/selectors';

import { Button } from '../components/ui/Button';
import { LayoutCard } from '../components/ui/LayoutCard';

export const Route = createFileRoute('/favorites')({
  component: FavoritesPage,
});

function FavoritesPage() {
  const [favorites, setFavorites] = useRecoilState(favoritesState);

  const favoriteProducts = useRecoilValue(favoritesProductsSelector);
  const [, setCart] = useRecoilState(cartState);

  const removeFavorite = (id: number) => {
    setFavorites(prev => prev.filter(x => x !== id));
  };

  const addToCart = (id: number) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === id);

      if (existing) {
        return prev.map(p =>
            p.id === id
                ? { ...p, quantity: p.quantity + 1 }
                : p
        );
      }

      return [...prev, { id, quantity: 1 }];
    });
  };

  return (
      <div style={{ display: 'grid', gap: 16 }}>
        <LayoutCard title="Избранное">
          <div style={{ marginBottom: 12 }}>
            Товаров в избранном: {favorites.length}
          </div>

          <Button variant="secondary" onClick={() => setFavorites([])}>
            Очистить
          </Button>
        </LayoutCard>

        {favoriteProducts.length === 0 ? (
            <LayoutCard title="Пусто">
              Нет избранных товаров
            </LayoutCard>
        ) : (
            favoriteProducts.map(item => (
                <LayoutCard key={item.id} title={item.title}>
                  <div style={{ marginBottom: 8 }}>
                    Цена: ${item.price}
                  </div>

                  <div style={{ display: 'flex', gap: 8 }}>
                    <Button
                        variant="primary"
                        onClick={() => addToCart(item.id)}
                    >
                      🛒 В корзину
                    </Button>

                    <Button
                        variant="danger"
                        onClick={() => removeFavorite(item.id)}
                    >
                      Удалить
                    </Button>
                  </div>
                </LayoutCard>
            ))
        )}
      </div>
  );
}