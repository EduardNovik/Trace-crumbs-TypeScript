import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { persistor, store } from './rdx/store';
import { PersistGate } from 'redux-persist/integration/react';


import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css'

import { GoogleOAuthProvider } from '@react-oauth/google';


export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID
export const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App/>
      </PersistGate>
    </Provider>   
  </GoogleOAuthProvider>
)


