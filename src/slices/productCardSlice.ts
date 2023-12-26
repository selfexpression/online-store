import { createSlice } from '@reduxjs/toolkit';

import { ProductCardState, Product } from '../types/interfaces.ts';

const initialState: ProductCardState = {
  currentProduct: null,
};

const slice = createSlice({
  name: 'productCard',
  initialState,
  reducers: {
    setCurrentProduct: (state, { payload }: { payload: Product }) => {
      state.currentProduct = payload;
    },
  },
});

export const { actions, reducer } = slice;
