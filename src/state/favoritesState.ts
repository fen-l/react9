import { atom } from 'recoil';
import { localStorageEffect } from './effects/localStorageEffect';

export const favoritesState = atom<number[]>({
    key: 'favoritesState',
    default: [],
    effects: [localStorageEffect<number[]>('favorites')],
});