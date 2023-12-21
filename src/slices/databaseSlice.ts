import { createSlice } from '@reduxjs/toolkit';

import { DatabaseState } from '../types/interfaces.ts';

// export interface InitialState {
//   categories: Category[];
//   products: Database;
// }

const initialState: DatabaseState = {
  categories: [],
  products: [],
};

const slice = createSlice({
  name: 'database',
  initialState,
  reducers: {
    setDatabase: (state, action) => {
      const { database, categories } = action.payload;
      state.products = database;
      state.categories = categories;
    },
  },
});

export const { actions, reducer } = slice;
