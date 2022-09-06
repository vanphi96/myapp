import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screen/Login';
const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      headerMode={null}>
      <Stack.Screen
        name={'Login'}
        component={Login}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
