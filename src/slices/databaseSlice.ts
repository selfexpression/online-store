import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Database } from '../types/aliases.ts';

export interface InitialState {
  products: Database;
}

const initialState: InitialState = {
  products: [],
};

const slice = createSlice({
  name: 'database',
  initialState,
  reducers: {
    setDatabase: (state, action: PayloadAction<Database>) => {
      const { payload } = action;
      state.products = payload;
    },
  },
});

export const { actions, reducer } = slice;
