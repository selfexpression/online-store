import { createSlice } from '@reduxjs/toolkit';

import type { Database, FirebaseData, SortedMap } from '../types/interfaces.ts';
import { sortedMap, sortedByStock } from '../utils/helpers.ts';

import { actions as filterActions } from './filterMenuSlice.ts';
import { actions as sortActions } from './sortMenuSlice.ts';

const initialState: Database = {
  categories: [],
  products: [],
  filteredProducts: [],
};

const slice = createSlice({
  name: 'database',
  initialState,
  reducers: {
    setDatabase: (state, { payload }: { payload: FirebaseData }) => {
      const { products, categories } = payload;
      state.categories = categories;
      state.products = sortedByStock(products);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(filterActions.setCurrentCategoryID, (state, { payload }) => {
        const { id: currentCategoryID } = payload;
        const { products } = state;
        const filtered = products.filter(({ categoryID }) => categoryID === currentCategoryID);
        state.filteredProducts = sortedByStock(filtered);
      })
      .addCase(sortActions.setCurrentValue, (state, { payload: currentValue }) => {
        const sortingFunction = sortedMap[currentValue as keyof SortedMap];
        const sortedProducts = sortedByStock(sortingFunction(state.products));
        const sortedFilteredProducts = sortedByStock(sortingFunction(state.filteredProducts));
        state.products = sortedProducts;
        state.filteredProducts = sortedFilteredProducts;
      });
  },
});

export const { actions, reducer } = slice;
