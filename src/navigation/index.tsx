import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import { PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';

const AppContainer = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
      <Toast />
    </PaperProvider>
  );
};

export default AppContainer;
