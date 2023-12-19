import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Database } from '../types/aliases.ts';

export interface InitialState {
  goods: Database;
}

const initialState: InitialState = {
  goods: [],
};

const slice = createSlice({
  name: 'database',
  initialState,
  reducers: {
    setDatabase: (state, action: PayloadAction<Database>) => {
      const { payload } = action;
      state.goods = payload;
    },
  },
});

export const { actions, reducer } = slice;
