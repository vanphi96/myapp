import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screen/Home';
const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator
      headerMode={null}>
      <Stack.Screen
        name={'Home'}
        component={Home}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
