import * as React from 'react';
import {StackActions} from '@react-navigation/native';
import {CommonActions} from '@react-navigation/native';

export const navigationRef = React.createRef();

export function navigate(routeName, params = {}, key) {
  navigationRef.current?.dispatch(
    CommonActions.navigate({
      name: routeName,
      params: params,
      key: key,
    }),
  );
}

export function goBack() {
  navigationRef.current?.goBack();
}

export function setRoot(routeName, params = {}) {
  navigationRef.current?.reset({
    index: 0,
    routes: [
      {
        name: routeName,
        params,
      },
    ],
  });
}

export function replace(routeName, params = {}) {
  navigationRef.current?.dispatch(StackActions.replace(routeName, params));
}

export function push(routeName, params = {}) {
  navigationRef.current?.dispatch(StackActions.push(routeName, params));
}
