import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { syncCartWithDatabase } from '../thunks/cartThunks.ts';
import { useAuth, useFirestore } from '../hooks/index.ts';
import type { AppDispatch } from '../types/aliases.ts';

export const CartLoader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userUID = useAuth();
  const db = useFirestore();

  useEffect(() => {
    dispatch(syncCartWithDatabase({ userUID, db }));
  }, [userUID]);

  return null;
};
