import { atom } from 'recoil';
import type { Product } from '../schemas/product.schema';

export const productIndexState = atom<Record<number, Product>>({
    key: 'productIndexState',
    default: {},
});