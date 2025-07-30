import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text, Avatar } from 'react-native-paper';
import profilePic from '../assets/profile.png';

const Header = ({ userName }: { userName: string }) => {
  return (
    <View style={styles.container}>
      <View style={styles.welcome}>
        <Text variant="bodyMedium">Welcome</Text>
        <Text variant="headlineSmall">{userName}</Text>
      </View>

      <View>
        <Avatar.Image size={50} source={profilePic} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  welcome: {
    flex: 1,
  },
});
