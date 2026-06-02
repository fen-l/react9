import { atom } from 'recoil';

export type ViewMode = 'grid' | 'list';
export type ThemeMode = 'light' | 'dark';

export interface UiSettingsState {
    viewMode: ViewMode;
    theme: ThemeMode;
}

export const uiSettingsState = atom<UiSettingsState>({
    key: 'uiSettingsState',
    default: {
        viewMode: 'grid',
        theme: 'light',
    },
});