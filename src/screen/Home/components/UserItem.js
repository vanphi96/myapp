/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useEffect} from 'react';
 import {
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
  Image
 } from 'react-native';
 
 const UserItem = (props) => {
   return (
     <TouchableOpacity onPress={() => props.onPressItem(props.data)} style={styles.item} key={props.data.id}>
        <Image style={styles.image} source={{uri: props.data.avatar}}/>
        <Text style={styles.name}>{props.data.name}</Text>
     </TouchableOpacity>
   );
 };
  
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  item: {
    backgroundColor: '#e6ebe7',
    width: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginVertical: 4
  },
  name: {
    marginHorizontal: 20,
    fontSize: 15,
    fontWeight: '500'
  }
})
 
 export default UserItem;
 