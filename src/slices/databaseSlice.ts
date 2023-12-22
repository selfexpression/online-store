import { createSlice } from '@reduxjs/toolkit';

import { DatabaseState, Product, Category } from '../types/interfaces.ts';

const initialState: DatabaseState = {
  categories: [],
  products: [],
};

const slice = createSlice({
  name: 'database',
  initialState,
  reducers: {
    setDatabase: (state, { payload }:
      { payload: { products: Product[], categories: Category[] } }) => {
      const { products, categories } = payload;
      state.products = products;
      state.categories = categories;
    },
  },
});

export const { actions, reducer } = slice;
