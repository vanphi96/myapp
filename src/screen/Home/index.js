/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useEffect, useState} from 'react';
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
 } from 'react-native';
 import database from '@react-native-firebase/database';
 import ItemUser from './components/ItemUser';
 import UserItem from './components/UserItem';
 
 const Home = () => {
  // database()
  //   .ref('/users')
  //   .on('value', snapshot => {
  //     console.log('User data: ', snapshot.val());
  //   });
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  useEffect( ()=> {
    // dispatch(onSetUserInfo(null))
    database().ref('/users/').once('value').then(snapshot => {
      let temp = [];
      snapshot.forEach(item => {
        temp.push(item.val());
      })
      setUsers(temp);
    });

  },[])

  const getData = async () => {

  }
   return (
     <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        {users && users.map((item, index) => 
          <UserItem key={index} data={item}/>
        )}
      </ScrollView>
     </SafeAreaView>
   );
 };
  
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
 
 export default Home;
 