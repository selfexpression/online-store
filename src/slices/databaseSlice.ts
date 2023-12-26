import { createSlice } from '@reduxjs/toolkit';

import { Database } from '../types/aliases.ts';

const initialState: Database = {
  categories: [],
  products: [],
};

const slice = createSlice({
  name: 'database',
  initialState,
  reducers: {
    setDatabase: (state, { payload }: { payload: Database }) => {
      const { products, categories } = payload;
      state.categories = categories;
      state.products = products;
    },
  },
});

export const { actions, reducer } = slice;
