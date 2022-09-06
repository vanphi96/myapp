/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useEffect} from 'react';
 import {useDispatch, useSelector} from 'react-redux';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
 } from 'react-native';
 import {NavigationContainer} from '@react-navigation/native';
 import AuthNavigation from './AuthNavigation';
 import MainNavigation from './MainNavigation';
 import {navigationRef} from '../service/navigationService';
 
 const AppNavigation = () => {
   const {profile} = useSelector((state) => {

        // console.log(state);
        // console.log(state.userInfoReducers);
        return state.userInfoReducers
   })
   useEffect(() => {
    // console.log(profile);
   },[profile])
   return (
        <NavigationContainer>
            {profile ? <MainNavigation/> : <AuthNavigation/>} 
        </NavigationContainer>
   );
 };
  
 const styles = StyleSheet.create({

 });
 
 export default AppNavigation;
 