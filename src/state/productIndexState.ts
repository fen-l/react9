import { atom } from 'recoil';
import type { Product } from '@/schemas/product.schema';
import { localStorageEffect } from './effects/localStorageEffect';

export const productIndexState = atom<Record<number, Product>>({
    key: 'productIndexState',
    default: {},
    effects: [localStorageEffect<Record<number, Product>>('product_index')],
});