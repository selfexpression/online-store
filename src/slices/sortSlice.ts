import { createSlice } from '@reduxjs/toolkit';

import { SortState } from '../types/interfaces.ts';

const sortValues = {
  toLowPrice: 'По убыванию цены',
  toHighPrice: 'По возрастанию цены',
};

const defaultValue = 'toHighPrice';

const initialState: SortState = {
  isOpenSortMenu: false,
  currentValue: defaultValue,
  sortValues,
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
