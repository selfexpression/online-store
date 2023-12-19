import { configureStore } from '@reduxjs/toolkit';

import { reducer as databaseSlice, actions as databaseActions } from './databaseSlice.ts';

export const actions = {
  ...databaseActions,
};

export const store = configureStore({
  reducer: {
    database: databaseSlice,
  },
});
