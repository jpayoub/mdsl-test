import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Text } from 'react-native-paper';
import FilterButton from './FilterButton';

const BalanceAndHistory = ({
  balance,
  transactions,
}: {
  balance: number;
  transactions: any[];
}) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredTransactions = transactions.filter(transaction => {
    if (selectedFilter === 'all') return true;
    return transaction.type === selectedFilter;
  });

  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <Text variant="headlineLarge">${balance}</Text>
      </View>
      <View style={styles.filterButtons}>
        <FilterButton
          label="All"
          isSelected={selectedFilter === 'all'}
          onPress={() => setSelectedFilter('all')}
        />
        <FilterButton
          label="incoming"
          isSelected={selectedFilter === 'incoming'}
          onPress={() => setSelectedFilter('incoming')}
        />
        <FilterButton
          label="outgoing"
          isSelected={selectedFilter === 'outgoing'}
          onPress={() => setSelectedFilter('outgoing')}
        />
      </View>
      <ScrollView
        style={styles.transactionList}
        showsVerticalScrollIndicator={false}
      >
        {filteredTransactions.map(transaction => (
          <View key={transaction.id} style={styles.transactionContainer}>
            <Text variant="titleMedium" style={styles.recipient}>
              {transaction.recipient}
            </Text>
            <Text
              variant="bodySmall"
              style={{
                color: transaction.type === 'incoming' ? 'green' : 'red',
              }}
            >
              {transaction.type.toUpperCase()}
            </Text>
            <Text
              variant="titleLarge"
              style={[
                styles.amount,
                { color: transaction.type === 'incoming' ? 'green' : 'red' },
              ]}
            >
              $
              {transaction.type === 'incoming'
                ? transaction.amount
                : -transaction.amount}
            </Text>
            <Text variant="bodySmall" style={styles.dateText}>
              {new Date(transaction.date).toLocaleDateString()}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 20,
  },
  balanceContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 10,
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  transactionList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  transactionContainer: {
    marginVertical: 10,
  },
  dateText: {
    color: 'gray',
  },
  recipient: {
    fontWeight: 'bold',
  },

  amount: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
});

export default BalanceAndHistory;
