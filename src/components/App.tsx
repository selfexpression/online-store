import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { useDispatch } from 'react-redux';

import { AuthContext } from '../contexts/index.ts';
import type { AuthContextProviderProps } from '../types/interfaces.ts';
import { syncCartWithDatabase } from '../thunks/cartThunks.ts';
import { useAuth, useDatabase } from '../hooks/index.ts';
import type { AppDispatch } from '../types/aliases.ts';

import { Store } from './Store.tsx';
import { ProductCard } from './ProductCard.tsx';
import { Navbar } from './Navbar.tsx';
import { Cart } from './Cart.tsx';

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [currentUserUID, setCurrentUserUID] = useState('');

  useEffect(() => {
    const authUser = async () => {
      const auth = getAuth();
      const anonymousUser = await signInAnonymously(auth);
      const { uid } = anonymousUser.user;
      setCurrentUserUID(uid);
    };

    authUser();
  });

  return (
    <AuthContext.Provider value={currentUserUID}>
      {children}
    </AuthContext.Provider>
  );
};

const CartLoader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userUID = useAuth();
  const db = useDatabase();

  useEffect(() => {
    dispatch(syncCartWithDatabase({ userUID, db }));
  }, [userUID]);

  return null;
};

export const App: React.FC = () => (
  <AuthContextProvider>
    <Router>
      <div className="d-flex flex-column">
        <Navbar />
        <CartLoader />
        <Routes>
          <Route path='/' element={<Store />} />
          <Route path='/product/:productId' element={<ProductCard />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </div>
    </Router>
  </AuthContextProvider>
);
