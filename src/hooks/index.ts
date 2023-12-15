import { useContext } from 'react';

import { DataApiContext } from '../contexts/index.ts';

export const useData = () => useContext(DataApiContext);
