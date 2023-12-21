import { configureStore } from '@reduxjs/toolkit';

import { reducer as databaseSlice, actions as databaseActions } from './databaseSlice.ts';
import { reducer as navFilterSlice, actions as navFilterActions } from './navFilterSlice.ts';

export const actions = {
  ...databaseActions,
  ...navFilterActions,
};

export const store = configureStore({
  reducer: {
    database: databaseSlice,
    navFilter: navFilterSlice,
  },
});
