import { createSlice } from '@reduxjs/toolkit';

import type { SortState } from '../types/interfaces.ts';

const defaultValue = 'toHighPrice';

const initialState: SortState = {
  isOpenSortMenu: false,
  currentValue: defaultValue,
};

const slice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    openSortMenu: (state, { payload }: { payload: boolean }) => {
      state.isOpenSortMenu = payload;
    },
    setCurrentValue: (state, { payload }: { payload: string }) => {
      state.currentValue = payload;
    },
  },
});

export const { actions, reducer } = slice;
