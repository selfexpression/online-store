import React from 'react';

import { Store } from './Store.tsx';
import { Nav } from './Nav.tsx';

export const App: React.FC = () => (
  <div className="d-flex flex-column">
    <Nav />
    <Store />
  </div>
);
