import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Store } from './Store.tsx';
import { ProductCard } from './ProductCard.tsx';

export const App: React.FC = () => (
  <Router>
    <div className="d-flex flex-column">
      <Routes>
        <Route path='/' element={<Store />} />
        <Route path='/product/:productId' element={<ProductCard />} />
      </Routes>
    </div>
  </Router>
);
