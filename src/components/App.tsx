import React from 'react';

import { Store } from './Store.tsx';
import { Nav } from './Nav.tsx';

export const App: React.FC = () => (
  <div className="d-flex flex-column h-100 w-100">
    <Nav />
    <Store />
  </div>
);
