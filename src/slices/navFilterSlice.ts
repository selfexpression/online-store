import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NavFilterState } from '../types/interfaces.ts';

const initialState: NavFilterState = {
  isOpenFilterMenu: false,
  currentCategoryID: null,
  isFiltered: false,
};

const slice = createSlice({
  name: 'navFilter',
  initialState,
  reducers: {
    openFilterMenu: (state, action: PayloadAction<boolean>) => {
      const { payload } = action;
      state.isOpenFilterMenu = payload;
    },
    setCurrentCategoryID: (state, { payload }) => {
      const { id, isFilteredValue } = payload;
      state.currentCategoryID = id;
      state.isFiltered = isFilteredValue;
    },
  },
});

export const { actions, reducer } = slice;
