import { useContext } from 'react';

import { DataApiContext } from '../contexts/index.ts';
import { Database } from '../types/aliases.ts';

export const useData = (): Database[] => useContext(DataApiContext);
