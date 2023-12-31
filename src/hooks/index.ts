import { useContext } from 'react';
import type { Firestore } from '@firebase/firestore';

import { DataApiContext, AuthContext } from '../contexts/index.ts';

export const useDatabase = (): Firestore => useContext(DataApiContext);

export const useAuth = () => useContext(AuthContext);
