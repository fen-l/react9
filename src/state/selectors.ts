import { selector } from 'recoil';
import { cartState } from './cartState';
import { favoritesState } from './favoritesState';
import { productIndexState } from './productIndexState';

export const cartCountState = selector<number>({
    key: 'cartCountState',
    get: ({ get }) => {
        const cart = get(cartState);
        return cart.reduce((sum, item) => sum + item.quantity, 0);
    },
});

export const favoritesProductsSelector = selector({
    key: 'favoritesProductsSelector',
    get: ({ get }) => {
        const favorites = get(favoritesState);
        const index = get(productIndexState);

        return favorites
            .map(id => index[id])
            .filter(Boolean);
    },
});

export const cartProductsSelector = selector({
    key: 'cartProductsSelector',
    get: ({ get }) => {
        const cart = get(cartState);
        const index = get(productIndexState);

        return cart
            .map(item => {
                const product = index[item.id];
                if (!product) return null;

                return {
                    ...product,
                    quantity: item.quantity,
                };
            })
            .filter(Boolean);
    },
});