import {createStore, applyMiddleware} from 'redux';
import {allReducers} from '../reducer/allReducer';
import logger from 'redux-logger';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const allMiddlewares = applyMiddleware(logger);

const persistConfig = {
  key: 'Root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, allReducers);

export const store = createStore(persistedReducer, {}, allMiddlewares);
export const persistor = persistStore(store);
