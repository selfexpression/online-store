import { configureStore } from '@reduxjs/toolkit';

import { reducer as databaseSlice, actions as databaseActions } from './databaseSlice.ts';
import { reducer as filterSlice, actions as filterActions } from './filterSlice.ts';
import { reducer as sortSlice, actions as sortActions } from './sortSlice.ts';

export const actions = {
  ...databaseActions,
  ...filterActions,
  ...sortActions,
};

export const store = configureStore({
  reducer: {
    database: databaseSlice,
    filter: filterSlice,
    sort: sortSlice,
  },
});
