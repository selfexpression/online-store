import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NavFilterState } from '../types/interfaces.ts';

const initialState: NavFilterState = {
  isOpenFilterMenu: false,
};

const slice = createSlice({
  name: 'navFilter',
  initialState,
  reducers: {
    openFilterMenu: (state, action: PayloadAction<boolean>) => {
      const { payload } = action;
      state.isOpenFilterMenu = payload;
    },
  },
});

export const { actions, reducer } = slice;
