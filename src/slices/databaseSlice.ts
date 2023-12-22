import { createSlice } from '@reduxjs/toolkit';

import { Product, ProductsState } from '../types/interfaces.ts';

const initialState: ProductsState = {
  products: [],
};

const slice = createSlice({
  name: 'database',
  initialState,
  reducers: {
    setDatabase: (state, { payload }:
      { payload: { products: Product[] } }) => {
      const { products } = payload;
      state.products = products;
    },
  },
});

export const { actions, reducer } = slice;
