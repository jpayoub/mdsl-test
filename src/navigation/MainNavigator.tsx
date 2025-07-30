import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Transfer from '../screens/Transfer';
import TopUp from '../screens/TopUp';

const MainStackNavigator = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <MainStackNavigator.Navigator initialRouteName="Home">
      <MainStackNavigator.Screen
        name="Home"
        component={Home}
        options={{
          title: 'MDSL BANK',
          headerTitleAlign: 'center',
        }}
      />
      <MainStackNavigator.Screen
        name="Transfer"
        component={Transfer}
        options={{
          title: 'Send Money',
          headerTitleAlign: 'center',
        }}
      />
      <MainStackNavigator.Screen
        name="TopUp"
        component={TopUp}
        options={{
          title: 'Top Up',
          headerTitleAlign: 'center',
        }}
      />
    </MainStackNavigator.Navigator>
  );
};

export default MainNavigator;
