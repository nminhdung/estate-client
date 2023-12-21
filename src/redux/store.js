import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore } from 'redux-persist';
import userReducer from './user/userSlice';
import persistReducer from 'redux-persist/es/persistReducer';


const persistConfig = {
  key: 'estate/user',
  storage
};
const userConfig = {
  ...persistConfig,
  whiteList: ['currentUser']
};


export const store = configureStore({
  reducer: {
    user: persistReducer(userConfig, userReducer)
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false
    });
  }
});

export const persistor = persistStore(store);