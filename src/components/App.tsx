import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getAuth, signInAnonymously } from 'firebase/auth';
import type { ReactNode } from 'react';

import { AuthContext } from '../contexts/index.ts';
import { routes } from '../utils/routes.ts';

import { Store } from './Store.tsx';
import { ProductCard } from './ProductCard.tsx';
import { Navbar } from './Navbar.tsx';
import { Cart } from './Cart.tsx';
import { CartLoader } from './CartLoader.tsx';

interface AuthContextProviderProps {
  children: ReactNode;
}

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

export const App: React.FC = () => (
  <AuthContextProvider>
    <Router>
      <div className="d-flex flex-column">
        <Navbar />
        <CartLoader />
        <Routes>
          <Route path={routes.mainPage()} element={<Store />} />
          <Route path={routes.productPage()} element={<ProductCard />} />
          <Route path={routes.cartPage()} element={<Cart />} />
        </Routes>
      </div>
    </Router>
  </AuthContextProvider>
);
