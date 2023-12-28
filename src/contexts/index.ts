import { Firestore } from '@firebase/firestore';
import { FirebaseStorage } from 'firebase/storage';
import { createContext } from 'react';

export const DataApiContext = createContext<Firestore>({} as Firestore);

export const StorageApiContext = createContext<FirebaseStorage>({} as FirebaseStorage);
