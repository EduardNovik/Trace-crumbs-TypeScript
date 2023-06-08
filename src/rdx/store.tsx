import { configureStore, combineReducers } from '@reduxjs/toolkit'
import countriesReducer from './countriesSlice'
import countryDetailsReducer from './countryDetailsSlice'
import countryCheckedReducer from  './countryCheckedSlice'
import signInReducer from './signInSlice'
import themeReducer from './themeSlice'
import photosReducer from './photosSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['countries','photos'],
}

const rootReducer = combineReducers({ 
  countries: countriesReducer,
  countryDetails: countryDetailsReducer,
  countryChecked: countryCheckedReducer,
  signIn: signInReducer,
  theme: themeReducer,
  photos: photosReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch