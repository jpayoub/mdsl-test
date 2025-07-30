import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { userData, transactions } from '../data/mockData';
import BalanceAndHistory from '../components/BalanceAndHistory';
import ActionButton from '../components/ActionButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const Home = () => {
  const [balance, setBalance] = useState(userData.balance);
  const [history, setHistory] = useState(transactions);
  const navigation = useNavigation<any>();

  const saveBalance = async (newBalance: number) => {
    try {
      await AsyncStorage.setItem('userBalance', newBalance.toString());
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error saving balance',
        text2: error.message,
      });
    }
  };

  const saveTransactions = async (newHistory: any[]) => {
    try {
      await AsyncStorage.setItem(
        'userTransactions',
        JSON.stringify(newHistory),
      );
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error saving transactions',
        text2: error.message,
      });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedBalance = await AsyncStorage.getItem('userBalance');
      const savedTransactions = await AsyncStorage.getItem('userTransactions');

      if (savedBalance) {
        setBalance(parseFloat(savedBalance));
      }

      if (savedTransactions) {
        setHistory(JSON.parse(savedTransactions));
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error loading data',
        text2: error.message,
      });
    }
  };

  const navigateTransfer = () => {
    navigation.navigate('Transfer', {
      balance,
      updateBalance: (newBalance: number) => {
        setBalance(newBalance);
        saveBalance(newBalance);
      },
      addTransaction: (transaction: any) => {
        const newHistory = [transaction, ...history];
        setHistory(newHistory);
        saveTransactions(newHistory);
      },
    });
  };

  const navigateTopUp = () => {
    navigation.navigate('TopUp', {
      balance,
      updateBalance: (newBalance: number) => {
        setBalance(newBalance);
        saveBalance(newBalance);
      },
      addTransaction: (transaction: any) => {
        const newHistory = [transaction, ...history];
        setHistory(newHistory);
        saveTransactions(newHistory);
      },
    });
  };

  return (
    <View style={styles.cardcontainer}>
      <Header userName={userData.name} />
      <BalanceAndHistory balance={balance} transactions={history} />
      <View style={styles.actionButtons}>
        <ActionButton
          title="Transfer Money"
          onPress={navigateTransfer}
          mode="contained"
        />
        <ActionButton title="Top Up" onPress={navigateTopUp} mode="outlined" />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  cardcontainer: {
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
});
