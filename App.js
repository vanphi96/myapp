/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   TouchableOpacity
 } from 'react-native';
 import AppNavigation from './src/navigation/AppNavitation';
 import {PersistGate} from 'redux-persist/integration/react';
 import { Provider } from 'react-redux';
 import {store, persist} from './src/stores/stores'
 import { Settings } from 'react-native-fbsdk-next';
 import { GoogleSignin } from '@react-native-google-signin/google-signin';
 
 const App = () => {
    Settings.initializeSDK();
   GoogleSignin.configure();
   return (
     <Provider store={store}>
       <PersistGate persistor={persist}>
         <AppNavigation/>
       </PersistGate>
     </Provider>
   );
 };
 
 export default App;
 