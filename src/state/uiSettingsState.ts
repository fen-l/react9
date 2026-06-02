import { atom } from 'recoil';

export const uiSettingsState = atom<{
    viewMode: 'grid' | 'list';
    theme: 'light' | 'dark';
}>({
    key: 'uiSettingsState',
    default: {
        viewMode: 'grid',
        theme: 'light',
    },
});