import type { Firestore } from '@firebase/firestore';
import { createContext } from 'react';

export const DataApiContext = createContext<Firestore>({} as Firestore);

export const AuthContext = createContext('');
