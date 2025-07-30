import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';

const FilterButton = ({
  label,
  isSelected,
  onPress,
}: {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}) => {
  return (
    <Button
      mode={isSelected ? 'contained' : 'outlined'}
      onPress={onPress}
      style={[styles.button, isSelected && styles.selectedButton]}
      labelStyle={isSelected ? styles.selectedText : styles.unselectedText}
    >
      {label}
    </Button>
  );
};

export default FilterButton;

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 5,
  },
  selectedButton: {
    backgroundColor: 'red',
  },
  selectedText: {
    color: 'white',
  },
  unselectedText: {
    color: 'red',
  },
});
