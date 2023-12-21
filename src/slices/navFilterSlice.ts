import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InitialState {
  isOpenFilterMenu: boolean;
}

const initialState: InitialState = {
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
