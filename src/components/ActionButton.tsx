import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';

const ActionButton = ({
  title,
  onPress,
  mode,
}: {
  title: string;
  onPress: () => void;
  mode: 'contained' | 'outlined';
}) => {
  return (
    <Button mode={mode} onPress={onPress} style={styles.button}>
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});
export default ActionButton;
