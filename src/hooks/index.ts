import { useContext } from 'react';
import { Firestore } from '@firebase/firestore';

import { DataApiContext } from '../contexts/index.ts';

export const useDatabase = (): Firestore => useContext(DataApiContext);
