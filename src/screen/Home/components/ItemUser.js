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
  Image
 } from 'react-native';
 
 const ItemUser = ({user}) => {
  console.log('item user');
  console.log(user);
   return (
     <View style={styles.item} key={user.id}>
        <Image style={styles.image} source={{uri: user.avatar}}/>
        <Text style={styles.name}>{user.name}</Text>
     </View>
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
 
 export default ItemUser;
 