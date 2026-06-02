import { type AtomEffect } from 'recoil';

export function localStorageEffect<T>(key: string): AtomEffect<T> {
    return ({ setSelf, onSet }) => {
        const saved = localStorage.getItem(key);

        if (saved != null) {
            setSelf(JSON.parse(saved));
        }

        onSet((newValue, _, isReset) => {
            if (isReset) {
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key, JSON.stringify(newValue));
            }
        });
    };
}