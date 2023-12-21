import { createSlice } from '@reduxjs/toolkit';

import { DatabaseState } from '../types/interfaces.ts';

const initialState: DatabaseState = {
  categories: [],
  products: [],
};

const slice = createSlice({
  name: 'database',
  initialState,
  reducers: {
    setDatabase: (state, action) => {
      const { products, categories } = action.payload;
      state.products = products;
      state.categories = categories;
    },
  },
});

export const { actions, reducer } = slice;
