/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useCallback} from 'react';
import {onSetUserInfo} from '../../stores/actions/actionSetProfile';
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
import database from '@react-native-firebase/database';
import {GiftedChat} from 'react-native-gifted-chat';
import {useDispatch, useSelector} from 'react-redux';
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid';

const Chat = props => {
  const dispatch = useDispatch();
  const {navigation, route} = props;
  const {item, roomId} = route.params;
  console.log('romm id'+roomId);

  const {profile} = useSelector(state => state.userInfoReducers);
  const [messages, setMessages] = useState([]);
  const [roomStatus, setStatusRoom] = useState(false);
  useEffect(() => {
      database().ref(`/room_chat/${roomId}`).orderByChild('createAt').once('value', snapshot => {
        console.log('one time');
      if(!snapshot.val()) {
        console.log(snapshot.val());
      } else {
          let listMess = [];
          setStatusRoom(true)
          snapshot.forEach(item => {
            console.log(item);
            let message = {
              _id: item.val()._id,
              text: item.val().text,
              user: {
                _id: item.val().userId == profile.id ? 1 : 2,
                avatar: item.val().avatar,
                name: item.val().userName
              }
            };
            listMess.push(message);
          })
          if(listMess) {
            setMessages(listMess.reverse());
          }
      }
    }).catch(error => {

    });

   
  }, []);

  useEffect(() => {
    database().ref(`/room_chat/${roomId}`).once('child_added', snapshot => {
      console.log('get data child_added');
      console.log(roomId);
      console.log(snapshot.val());
      if(!snapshot.val()) {
        console.log('snapshot null');
      } else {
          let listMess = [...messages];
          console.log('item');
          console.log(snapshot.val());
          // let message = {
          //   _id: snapshot.val()._id,
          //   text: snapshot.val().text,
          //   user: {
          //     _id: snapshot.val().userId == profile.id ? 1: 2,
          //     avatar: snapshot.val().avatar,
          //     name: snapshot.val().userName
          //   }
          // };
          // let itemFind = listMess.find(item => item._id == message._id)
          // if(!itemFind) {
          //   listMess.push(message);
          //   setMessages(listMess);
          // }
        }
      }, error => {
        console.log(error);
      });
    
    // return () => database().ref(`/rooms/${roomId}`).off('child_added', onChildAdd);
  }, [roomId])


  const onSend = useCallback((messages = []) => {
    console.log(messages);
    let data = {};
    if(messages[0].text.trim()) {
      data._id = uuidv4();
      data.createAt = new Date().getTime();
      data.userName = profile.name;
      data.userId = profile.id;
      data.avatar = profile.avatar;
      data.text = messages[0].text;
      database().ref(`/room_chat/${roomId}`).push(data).then(() => {
        console.log('added data');
      });
    }

    const addMessage = () => {
      
    }
   
    // setMessages(previousMessages =>
    //   GiftedChat.append(previousMessages, messages),
    // );

    // if()
    // database().ref(`/room-chat/${data.id}`).once('value').then(snapshot => {
    //   if(!snapshot.val()) {
    //    database().ref('/users/'+data.id).set(data).then(() => console.log('Data seted.'));
    //   }
    // });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
