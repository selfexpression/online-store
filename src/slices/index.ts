import { configureStore } from '@reduxjs/toolkit';

import { reducer as databaseSlice, actions as databaseActions } from './databaseSlice.ts';
import { reducer as filterSlice, actions as filterActions } from './filterSlice.ts';
import { reducer as sortSlice, actions as sortActions } from './sortSlice.ts';
import { reducer as productCardSlice, actions as productCardActions } from './productCardSlice.ts';
import { reducer as navbarSlice, actions as navbarActions } from './navbarSlice.ts';

export const actions = {
  ...databaseActions,
  ...filterActions,
  ...sortActions,
  ...productCardActions,
  ...navbarActions,
};

export const store = configureStore({
  reducer: {
    database: databaseSlice,
    filter: filterSlice,
    sort: sortSlice,
    productCard: productCardSlice,
    navbar: navbarSlice,
  },
});
