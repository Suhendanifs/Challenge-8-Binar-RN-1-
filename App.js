import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Router from './src/routers';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
