/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import AppContainer from './src/navigation/index';
import React from 'react';
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return <AppContainer />;
};

export default App;
