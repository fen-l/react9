# Лабораторная работа №9: Глобальное UI-состояние и композиция данных (Recoil)

## Meta
Author: Анастасия Лавриеня  
Stack: React, TypeScript, TanStack Router, TanStack Query, Zod, Vite, Recoil

---

## Описание лабораторной работы

Данная лабораторная работа является расширением проекта, построенного в ЛР №8, путем добавления слоя глобального клиентского состояния с использованием `Recoil`. Цель работы — разделение **server state** и **client state**, внедрение атомарного управления UI-состоянием и реализация локальной бизнес-логики (корзина и избранное) без обращения к серверу, с обеспечением реактивного и мгновенного обновления интерфейса (`Optimistic UI`).

---

## Установка зависимостей

```bash
npm install recoil
```

## Контрольные вопросы и ответы

1. Почему мы храним ID в **Recoil**, а не полные объекты товаров?
   Хранение ID позволяет нормализовать данные и избежать дублирования. Полные данные товаров являются server state (`TanStack Query`) и должны храниться в кэше, а `Recoil` управляет только клиентским состоянием (корзина, избранное).

2. Как компоненты узнают, что товар уже в корзине?
   Компоненты сравнивают `product.id` с данными из `cartState`. Если ID найден — товар считается добавленным, что позволяет отрисовать активное состояние кнопки.

3. Как передать состояние корзины в оформление заказа?
   Состояние корзины берётся из Recoil (`cartState` или селекторов) и используется напрямую на странице checkout либо через селектор, который объединяет корзину с данными товаров.

4. Почему products (список товаров) в **TanStack Query**, а `viewMode` в `Recoil`?
   `TanStack Query` используется для **server state** (данные с API, кэш, инвалидация).  
   `Recoil` используется для **client state** (UI-настройки, переключатели, локальные состояния).

5. Что будет, если хранить товары в **Recoil**?
   Потеряются преимущества `TanStack Query`:
   - кэширование
   - автоматическая инвалидация
   - синхронизация с сервером
   - дедупликация запросов

6. Как **Recoil** гарантирует, что `Navbar` перерисуется только при изменении `cartCountState`?
   Компонент подписывается только на селектор `cartCountState`, поэтому перерендер происходит только при изменении зависимостей этого селектора.

7. Как **Recoil** предотвращает лишние ререндеры?
   `Recoil` использует атомарную подписку: компонент перерисовывается только при изменении конкретного атома/селектора, на который он подписан, а не всего глобального состояния.

8. Разница между **useRecoilState** и **useSetRecoilState**?
   - `useRecoilState` → даёт значение + setter (вызывает ререндер при изменении)
   - `useSetRecoilState` → даёт только setter (не подписывает на состояние → меньше ререндеров)

9. Что производительнее и почему?
   `useSetRecoilState` производительнее, потому что компонент не подписывается на изменения состояния и не перерисовывается при его обновлении.

10. Можно ли создать селектор, зависящий от **TanStack Query** и **Recoil**?
    Да. Селектор может читать `Recoil` state напрямую и использовать данные из `queryClient` (внешний источник), объединяя server state и client state в вычисляемое значение.


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
