import { createContext } from 'react';

import { Data } from '../types/aliases.ts';

export const DataApiContext = createContext<Data[]>([]);
