import { createSlice } from '@reduxjs/toolkit';

import type { FilterState } from '../types/interfaces.ts';

const initialState: FilterState = {
  isOpenFilterMenu: false,
  currentCategoryID: null,
  isFiltered: false,
};

const slice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    openFilterMenu: (state, { payload }: { payload: boolean }) => {
      state.isOpenFilterMenu = payload;
    },
    setCurrentCategoryID: (state, { payload }:
      { payload: { id: number | null, isFilteredValue: boolean } }) => {
      const { id, isFilteredValue } = payload;
      state.currentCategoryID = id;
      state.isFiltered = isFilteredValue;
    },
  },
});

export const { actions, reducer } = slice;
