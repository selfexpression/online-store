import { useContext } from 'react';

import { FirestoreContext, AuthContext } from '../contexts/index.ts';

export const useFirestore = () => useContext(FirestoreContext);

export const useAuth = () => useContext(AuthContext);
