import { useContext, useState, useEffect } from 'react';
import type { Firestore } from '@firebase/firestore';

import { DataApiContext, AuthContext } from '../contexts/index.ts';

export const useFirestore = (): Firestore => useContext(DataApiContext);

export const useAuth = () => useContext(AuthContext);

export const useScrollY = () => {
  const [scrollPosition, setScrollPosition] = useState({ scrollY: 0 });

  useEffect(() => {
    const updatePosition = () => {
      window.requestAnimationFrame(() => {
        setScrollPosition({ scrollY: window.scrollY });
      });
    };

    window.addEventListener('scroll', updatePosition);
    updatePosition();

    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return scrollPosition;
};
