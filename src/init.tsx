import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, getDocs,
} from 'firebase/firestore';

import { App } from './components/App.tsx';
import { DataApiContext } from './contexts/index.ts';
import { DataApi } from './interfaces/index.ts';

const runApp = async (): Promise<void> => {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  };

  const dataApi: DataApi = {
    getHaircareData: async () => {
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      const querySnapshot = await getDocs(collection(db, 'haircare'));
      return querySnapshot.docs.map((doc) => doc.data());
    },
  };

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
  );

  root.render(
    <React.StrictMode>
      <DataApiContext.Provider value={dataApi}>
        <App />
      </DataApiContext.Provider>
    </React.StrictMode>,
  );
};

export default runApp;
