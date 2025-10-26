import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme, theme } = useTheme();

  return (
    <TouchableOpacity 
      style={[styles.toggleButton, { backgroundColor: theme.card }]}
      onPress={toggleTheme}
    >
      <Ionicons 
        name={isDarkMode ? "sunny" : "moon"} 
        size={24} 
        color={theme.primary} 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleButton: {
    padding: 8,
    borderRadius: 20,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default ThemeToggle;