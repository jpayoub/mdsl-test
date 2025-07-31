import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { userData } from '../data/mockData';
import Header from '../components/Header';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const Transfer = ({ route }: any) => {
  const navigation = useNavigation();
  const { balance, updateBalance, addTransaction } = route.params;
  const [loading, setLoading] = useState(false);

  const transferSchema = Yup.object().shape({
    recipient: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Recipient name is required'),

    amount: Yup.number()
      .positive('Amount must be positive')
      .max(balance || 0, `Amount cannot exceed $${balance || 0}`)
      .required('Amount is required'),
  });

  const handleTransfer = async (transferData: any) => {
    setLoading(true);

    setTimeout(() => {
      const newBalance = balance - parseFloat(transferData.amount);
      updateBalance(newBalance);
      addTransaction(transferData);

      setLoading(false);

      Toast.show({
        type: 'success',
        text1: 'Transfer Successful',
        text2: `You have sent $${transferData.amount} to ${transferData.recipient}.`,
        visibilityTime: 3500,
      });
      navigation.goBack();
    }, 2500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Formik
          initialValues={{ recipient: '', amount: '' }}
          validationSchema={transferSchema}
          onSubmit={values => {
            const transferData = {
              ...values,
              date: new Date().toISOString(),
              type: 'outgoing',
              id: `tx${Date.now()}`,
            };

            handleTransfer(transferData);
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
                label="Recipient Name"
                value={values.recipient}
                onChangeText={handleChange('recipient')}
                onBlur={handleBlur('recipient')}
                mode="outlined"
                style={styles.input}
                error={touched.recipient && !!errors.recipient}
              />
              {touched.recipient && errors.recipient && (
                <Text style={styles.errorText}>{errors.recipient}</Text>
              )}
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
                {loading ? 'Processing...' : 'Send Money'}
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

export default Transfer;
