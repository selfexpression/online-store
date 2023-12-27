import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Store } from './Store.tsx';
import { ProductCard } from './ProductCard.tsx';
import { Navbar } from './Navbar.tsx';

export const App: React.FC = () => (
  <Router>
    <div className="d-flex flex-column">
      <Navbar />
      <Routes>
        <Route path='/' element={<Store />} />
        <Route path='/product/:productId' element={<ProductCard />} />
      </Routes>
    </div>
  </Router>
);
