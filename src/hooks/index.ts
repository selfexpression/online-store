import { useContext } from 'react';
import type { Firestore } from '@firebase/firestore';
import type { FirebaseStorage } from 'firebase/storage';

import { DataApiContext, StorageApiContext } from '../contexts/index.ts';

export const useDatabase = (): Firestore => useContext(DataApiContext);

export const useStorage = (): FirebaseStorage => useContext(StorageApiContext);
