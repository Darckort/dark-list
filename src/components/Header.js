import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

const Header = ({ title }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: theme.header }]}>
      <Text style={[styles.headerText, { color: theme.headerText }]}>
        {title}
      </Text>
      <ThemeToggle />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 15,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
});

export default Header;