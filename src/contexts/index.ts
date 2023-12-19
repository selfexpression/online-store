import { Firestore } from '@firebase/firestore';
import { createContext } from 'react';

export const DataApiContext = createContext<Firestore>({} as Firestore);
