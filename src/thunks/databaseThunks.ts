import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Firestore } from '@firebase/firestore';

import { actions } from '../slices/databaseSlice.ts';
import type { DatabaseState } from '../types/interfaces.ts';
import { getProductCategoryData } from '../services/databaseService.ts';

export const loadData = createAsyncThunk(
  'database/loadData',
  async (
    { db, databaseState }:
    { db: Firestore, databaseState: DatabaseState },
    { dispatch },
  ) => {
    const { categories, products } = databaseState;

    if (!!categories.length || !!products.length) {
      return;
    }

    try {
      const database = await getProductCategoryData(db);

      const payload = {
        categories: database.categories,
        products: database.products,
      };

      dispatch(actions.setDatabase(payload));
    } catch (error) {
      console.error('Error loading data from Firestore:', error);
      throw error;
    }
  },
);
