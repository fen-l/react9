import { createFileRoute } from '@tanstack/react-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartState } from '../state/cartState';
import { cartProductsSelector } from '../state/selectors';
import { Button } from '../components/ui/Button';
import { LayoutCard } from '../components/ui/LayoutCard';

export const Route = createFileRoute('/cart')({
  component: CartPage,
});

function CartPage() {
  const [cart, setCart] = useRecoilState(cartState);
  const cartProducts = useRecoilValue(cartProductsSelector);

  const increase = (id: number) => {
    setCart(prev =>
        prev.map(item =>
            item.id === id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        )
    );
  };

  const decrease = (id: number) => {
    setCart(prev =>
        prev
            .map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
            .filter(item => item.quantity > 0)
    );
  };

  const remove = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const totalCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
      <div style={{ display: 'grid', gap: 16 }}>
        <LayoutCard title="Корзина">
          <div style={{ marginBottom: 12 }}>
            Товаров в корзине: {totalCount}
          </div>

          <Button variant="secondary" onClick={clearCart}>
            Очистить корзину
          </Button>
        </LayoutCard>

        {cartProducts.length === 0 ? (
            <LayoutCard title="Пусто">
              Корзина пуста
            </LayoutCard>
        ) : (
            cartProducts.map(item => (
                <LayoutCard key={item.id} title={item.title}>
                  <div style={{ marginBottom: 8 }}>
                    Цена: ${item.price}
                  </div>

                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <Button onClick={() => decrease(item.id)}>-</Button>

                    {/* quantity уже приходит из selector */}
                    <span>{item.quantity}</span>

                    <Button onClick={() => increase(item.id)}>+</Button>

                    <Button
                        variant="danger"
                        onClick={() => remove(item.id)}
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