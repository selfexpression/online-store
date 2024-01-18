import { createSlice } from '@reduxjs/toolkit';

import type { DatabaseState, ProductCategoryData } from '../types/interfaces.ts';
import { sortedMap, sortedByStock, SortedMap } from '../utils/helpers.ts';

import { actions as filterActions } from './filterMenuSlice.ts';
import { actions as sortActions } from './sortMenuSlice.ts';

const initialState: DatabaseState = {
  categories: [],
  products: [],
  filteredProducts: [],
  isLoaded: false,
};

const slice = createSlice({
  name: 'database',
  initialState,
  reducers: {
    setIsLoaded: (state, { payload }: { payload: boolean }) => {
      state.isLoaded = payload;
    },
    setDatabase: (state, { payload }: { payload: ProductCategoryData }) => {
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
