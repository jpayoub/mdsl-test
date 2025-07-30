import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';

const ActionButton = ({
  title,
  onPress,
  mode,
  style,
}: {
  title: string;
  onPress: () => void;
  mode: 'contained' | 'outlined';
  style?: object;
}) => {
  return (
    <Button mode={mode} onPress={onPress} style={[styles.button, style]}>
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
