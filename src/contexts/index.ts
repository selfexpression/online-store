import { Firestore } from '@firebase/firestore';
import type { FirebaseStorage } from 'firebase/storage';
import { createContext } from 'react';

export const DataApiContext = createContext<Firestore>({} as Firestore);

export const StorageApiContext = createContext<FirebaseStorage>({} as FirebaseStorage);
