import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    setIsDarkMode(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  // Colores para modo claro 
  const lightTheme = {
    // Estado
    isDarkMode: false,
    
    // Colores base
    background: '#F5F5F5',
    card: '#FFFFFF',
    text: '#333333',
    textSecondary: '#666666',
    textMuted: '#888888',
    border: '#E0E0E0',
    
    // Colores de marca
    primary: '#8B0000',
    primaryLight: '#A52A2A',
    success: '#4CAF50',
    warning: '#FF9800',
    danger: '#F44336',
    gold: '#FFD700',
    
    // Componentes específicos
    header: '#8B0000',
    headerText: '#FFFFFF',
    tabBar: '#FFFFFF',
    tabBarActive: '#8B0000',
    tabBarInactive: '#666666',
    inputBackground: '#FFFFFF',
    inputBorder: '#DDDDDD',
    modalBackground: '#FFFFFF',
    statsCard: '#FFFFFF',
    progressBar: '#E0E0E0',
    progressFill: '#8B0000'
  };

  // Colores para modo oscuro
  const darkTheme = {
    // Estado
    isDarkMode: true,
    
    // Colores base
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    textSecondary: '#CCCCCC',
    textMuted: '#999999',
    border: '#333333',
    
    // Colores de marca
    primary: '#B22222',
    primaryLight: '#CD5C5C',
    success: '#66BB6A',
    warning: '#FFA726',
    danger: '#EF5350',
    gold: '#FFD700',
    
    // Componentes específicos
    header: '#1A0000',
    headerText: '#FFFFFF',
    tabBar: '#1E1E1E',
    tabBarActive: '#B22222',
    tabBarInactive: '#888888',
    inputBackground: '#2D2D2D',
    inputBorder: '#444444',
    modalBackground: '#2D2D2D',
    statsCard: '#2D2D2D',
    progressBar: '#333333',
    progressFill: '#B22222'
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  const value = {
    isDarkMode,
    toggleTheme,
    theme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};