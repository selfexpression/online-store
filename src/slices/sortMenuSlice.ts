import { createSlice } from '@reduxjs/toolkit';

interface SortState {
  isOpenSortMenu: boolean;
  currentValue: string;
}

const initialState: SortState = {
  isOpenSortMenu: false,
  currentValue: '',
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
