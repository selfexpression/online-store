import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, getDocs,
} from 'firebase/firestore';

import { App } from './components/App.tsx';
import { DataApiContext } from './contexts/index.ts';
import { Database } from './types/aliases.ts';
import { isValidData } from './types/predicates.ts';

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

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const coll: Database[] = await new Promise((resolve, reject) => {
    getDocs(collection(db, 'cosmetics'))
      .then((querySnapshot) => {
        const data: Database[] = querySnapshot.docs.map((doc) => {
          const docData = doc.data() as Database;
          if (!isValidData(docData)) {
            console.error('Invalid data received from the database');
          }
          return docData;
        });
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
  );

  root.render(
    <React.StrictMode>
      <DataApiContext.Provider value={coll}>
        <App />
      </DataApiContext.Provider>
    </React.StrictMode>,
  );
};

export default runApp;
