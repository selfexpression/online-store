import { createContext } from 'react';

import { Database } from '../types/aliases.ts';

export const DataApiContext = createContext<Database[]>([]);
