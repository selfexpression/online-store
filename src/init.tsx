import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';

import { App } from './components/App.tsx';
import { DataApiContext, StorageApiContext } from './contexts/index.ts';
import { store } from './slices/index.ts';
import { resources } from './locales/index.ts';

const runApp = async (): Promise<void> => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

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
  const storage = getStorage(app);

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
  );

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <DataApiContext.Provider value={db}>
          <StorageApiContext.Provider value={storage}>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </StorageApiContext.Provider>
        </DataApiContext.Provider>
      </Provider>
    </React.StrictMode>,
  );
};

export default runApp;
