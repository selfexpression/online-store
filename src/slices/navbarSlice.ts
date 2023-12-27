import { createSlice } from '@reduxjs/toolkit';

import { NavbarState } from '../types/interfaces.ts';

const initialState: NavbarState = {
  isOpenNavbar: false,
};

const slice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    adjustNavbar: (state, { payload }: { payload: boolean }) => {
      state.isOpenNavbar = payload;
    },
  },
});

export const { actions, reducer } = slice;
