import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { userData } from '../data/mockData';
import Header from '../components/Header';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const TopUp = ({ route }: any) => {
  const navigation = useNavigation();
  const { balance, updateBalance, addTransaction } = route.params;
  const [loading, setLoading] = useState(false);

  const topUpSchema = Yup.object().shape({
    amount: Yup.number()
      .typeError('Please enter a valid number')
      .positive('Amount must be positive')
      .min(1, 'Minimum top-up amount is $1')
      .max(10000, 'Maximum top-up amount is $10,000')
      .required('Amount is required'),
  });

  const handleTopUp = async (topUpData: any) => {
    setLoading(true);

    setTimeout(() => {
      const newBalance = balance + parseFloat(topUpData.amount);
      updateBalance(newBalance);
      addTransaction(topUpData);

      setLoading(false);

      Toast.show({
        type: 'success',
        text1: 'Top Up Successful',
        text2: `You have topped up $${topUpData.amount}.`,
        visibilityTime: 3500,
      });
      navigation.goBack();
    }, 2500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Formik
          initialValues={{ amount: '' }}
          validationSchema={topUpSchema}
          onSubmit={values => {
            const topUpData = {
              ...values,
              date: new Date().toISOString(),
              type: 'incoming',
              id: `tx${Date.now()}`,
            };

            handleTopUp(topUpData);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <TextInput
                label="Amount"
                value={values.amount}
                onChangeText={handleChange('amount')}
                onBlur={handleBlur('amount')}
                mode="outlined"
                keyboardType="numeric"
                style={styles.input}
                error={touched.amount && !!errors.amount}
              />
              {touched.amount && errors.amount && (
                <Text style={styles.errorText}>{errors.amount}</Text>
              )}
              <Button
                mode="contained"
                onPress={() => {
                  handleSubmit();
                }}
                style={styles.submitButton}
                loading={loading}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Top Up Money'}
              </Button>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  formContainer: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 10,
  },
  submitButton: {
    marginTop: 20,
    paddingVertical: 8,
  },
});

export default TopUp;
