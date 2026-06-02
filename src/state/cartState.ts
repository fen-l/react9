import { atom } from 'recoil';
import { localStorageEffect } from './effects/localStorageEffect';

export type CartItem = {
    id: number;
    quantity: number;
};

export const cartState = atom<CartItem[]>({
    key: 'cartState',
    default: [],
    effects: [localStorageEffect<CartItem[]>('cart')],
});