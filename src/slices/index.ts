import { configureStore } from '@reduxjs/toolkit';

import { reducer as databaseSlice, actions as databaseActions } from './databaseSlice.ts';
import { reducer as filterSlice, actions as filterActions } from './filterMenuSlice.ts';
import { reducer as sortSlice, actions as sortActions } from './sortMenuSlice.ts';
import { reducer as productCardSlice, actions as productCardActions } from './productCardSlice.ts';
import { reducer as cartSlice, actions as cartActions } from './cartSlice.ts';

export const actions = {
  ...databaseActions,
  ...filterActions,
  ...sortActions,
  ...productCardActions,
  ...cartActions,
};

export const store = configureStore({
  reducer: {
    database: databaseSlice,
    filter: filterSlice,
    sort: sortSlice,
    productCard: productCardSlice,
    cart: cartSlice,
  },
});
