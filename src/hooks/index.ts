import { useContext } from 'react';
import { Firestore } from '@firebase/firestore';
import { FirebaseStorage } from 'firebase/storage';

import { DataApiContext, StorageApiContext } from '../contexts/index.ts';

export const useDatabase = (): Firestore => useContext(DataApiContext);

export const useStorage = (): FirebaseStorage => useContext(StorageApiContext);
