import {applyMiddleware, createStore} from 'redux';
import allReducers from './reducers';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
// create the persist store
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userInfoReducers'],
  blacklist: [],
  // blacklist: ['partnerDetails', 'options', 'userProfile', 'search', 'footprint', 'badges'],
  timeout: null,
};
const reducer = persistReducer(persistConfig, allReducers);
const store = createStore(reducer);
const persist = persistStore(store);
export {store, persist};
