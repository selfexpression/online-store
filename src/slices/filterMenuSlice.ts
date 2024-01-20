import { createSlice } from '@reduxjs/toolkit';

export interface FilterState {
  isOpenFilterMenu: boolean;
  currentCategoryID: number | null;
  currentBrandNames: string[];
}

const initialState: FilterState = {
  isOpenFilterMenu: false,
  currentCategoryID: null,
  currentBrandNames: [],
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
      const { id } = payload;
      state.currentCategoryID = id;
    },
    setCurrentBrandNames: (state, { payload }:
      { payload: { name: string, isCheckedInput: boolean } }) => {
      const { name, isCheckedInput } = payload;

      if (!isCheckedInput) {
        const filtered = state.currentBrandNames.filter((item) => item !== name);
        state.currentBrandNames = filtered;
        return;
      }

      state.currentBrandNames = [...state.currentBrandNames, name];
    },
  },
});

export const { actions, reducer } = slice;
