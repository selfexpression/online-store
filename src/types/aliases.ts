import { store } from '../slices/index.ts';

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
