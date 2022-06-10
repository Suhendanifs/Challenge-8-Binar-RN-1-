import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Router from './src/routers';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
