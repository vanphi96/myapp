/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useEffect} from 'react';
 import { useDispatch } from 'react-redux';
 import {onSetUserInfo} from '../../stores/actions/actionSetProfile'
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   TouchableOpacity,
   Image,
 } from 'react-native';
 import {push} from '../../service/navigationService';
 import { LoginButton, AccessToken, LoginManager, Profile, Settings } from 'react-native-fbsdk-next';
 import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
 import database from '@react-native-firebase/database';
 const Login = () => {
   const dispatch = useDispatch();
  useEffect(()=> {
    // dispatch(onSetUserInfo(null))
  },[])

  const loginFacebook = async () => {
    //await LoginManager.logOut();
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile']);
      const profile = await Profile.getCurrentProfile();
      console.log(profile, 'loginFacebook');
      if (profile) {
        let data = {
          name: `${profile?.firstName} ${profile?.lastName}`,
          id: profile?.userID ?? '',
          avatar: profile?.imageURL ?? ''
        }
        dispatch(onSetUserInfo(data))
        database().ref(`/users/${data.id}`).once('value').then(snapshot => {
          if(!snapshot.val()) {
           database().ref('/users/'+data.id).set(data).then(() => console.log('Data seted.'));
          }
        });
      }
      
    } catch (error) {
      console.log(error, 'loginFacebook');
    }
  };

  const loginGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('login gg');
      if (userInfo) {
        let data = {
          name: userInfo?.user?.name ?? '',
          id: userInfo?.user?.id ?? '',
          avatar: userInfo?.user?.photo ?? '',
        }
          database().ref(`/users/${data.id}`).once('value').then(snapshot => {
           if(!snapshot.val()) {
            database().ref('/users/'+data.id).set(data).then(() => console.log('Data seted.'));
           }
          });
          dispatch(onSetUserInfo(data))
      }
      
    } catch (error) {
      console.log(error, 'login google')
    }
  }
   return (
     <SafeAreaView  style={styles.container}>
      <TouchableOpacity onPress={loginGoogle} style={styles.btn}>
        <Image style={styles.img} source={require('../../assets/images/img_google.png')}/>
      </TouchableOpacity>
      <TouchableOpacity  onPress={loginFacebook} style={styles.btn}>
        <Image style={styles.img} source={require('../../assets/images/img_facebook.png')}/>
      </TouchableOpacity>
     </SafeAreaView>
   );
 };

 const styles = StyleSheet.create({
    img: {
      width: 300,
      height: 50,
      resizeMode: 'contain'
    },
    btn: {
      margin: 10,
      alignContent: 'center'
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      flex: 1
    }
 })
  
 
 export default Login;
 