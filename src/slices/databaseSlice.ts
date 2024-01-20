import { createSlice } from '@reduxjs/toolkit';
// import _ from 'lodash';

import type { DatabaseState, ProductCategoryData } from '../types/interfaces.ts';
import { sortedMap, sortedByStock, type SortedMap } from '../utils/helpers.ts';

import { actions as sortActions } from './sortMenuSlice.ts';

const initialState: DatabaseState = {
  categories: [],
  products: [],
  initialProducts: [],
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
      state.initialProducts = sortedByStock(products);
    },
    filterProducts: (state, { payload }:
      { payload: { currentBrandNames: string[], currentCategoryID: number| null } }) => {
      const { initialProducts } = state;
      const { currentBrandNames, currentCategoryID } = payload;

      state.filteredProducts = initialProducts;

      if (currentBrandNames.length) {
        state.filteredProducts = state.filteredProducts
          .filter((product) => currentBrandNames.includes(product.brand.toLowerCase()));
      }

      if (currentCategoryID) {
        state.filteredProducts = state.filteredProducts
          .filter((product) => product.categoryID === currentCategoryID);
      }

      state.products = state.filteredProducts;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sortActions.setCurrentValue, (state, { payload: currentValue }) => {
        const { initialProducts } = state;

        if (!currentValue) {
          state.products = initialProducts;
          return;
        }

        const sortingFunction = sortedMap[currentValue as keyof SortedMap];
        const sortedProducts = sortedByStock(sortingFunction(state.products));
        const sortedFilteredProducts = sortedByStock(
          sortingFunction(state.filteredProducts),
        );

        state.products = sortedProducts;
        state.filteredProducts = sortedFilteredProducts;
      });
  },
});

export const { actions, reducer } = slice;
