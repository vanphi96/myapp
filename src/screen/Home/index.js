/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useEffect, useState} from 'react';
 import { useDispatch, useSelector } from 'react-redux';
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
 import UserItem from './components/UserItem';
 import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';
 
 const Home = (props) => {
  const { navigation, route } = props;
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const {profile} = useSelector((state) => state.userInfoReducers);

  useEffect( ()=> {
    // dispatch(onSetUserInfo(null))
    database().ref('/users/').once('value').then(snapshot => {
      let temp = [];
      snapshot.forEach(item => {
        if(item.val().id !== profile.id) temp.push(item.val());
      })
      setUsers(temp);
    });
  },[])

  const onPressItem = (item) => {
    database()
    .ref('/rooms_id/')
    .orderByChild('userId')
    .equalTo(item.id)
    .once('value')
    .then(snapshot => {
      console.log('User data: ', snapshot.val());
      if(snapshot.val()) {
        let data = {};
        snapshot.forEach(room => {
          if(room) {
            data = room.val();
          }
        })
        if(data) {
          navigation.navigate('Chat', { item: item, roomId: data.roomId}); 

        }
      } else {
        let roomId=uuidv4();
        let data1 = {
          roomId,
          userId: item.id
        }
        let data2 = {
          roomId,
          userId: profile.id
        }
        database().ref(`/rooms_id`).push(data1).then(() => {
          console.log('added data');
        });
        database().ref(`/rooms_id`).push(data2).then(() => {
          console.log('added data');
        });
        navigation.navigate('Chat', { item: item, roomId}); 
      }
    });
  }


   return (
     <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        {users && users.map((item, index) => 
          <UserItem onPressItem={onPressItem} key={index} data={item}/>
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
 