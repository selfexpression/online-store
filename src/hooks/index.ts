import { useContext } from 'react';

import { DataApiContext } from '../contexts/index.ts';
import { Data } from '../types/aliases.ts';

export const useData = (): Data[] => useContext(DataApiContext);
