import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import { useTema } from '../context/ContextoTema';
import ThemeToggle from './InterruptorTema';

const Encabezado = ({ title }) => {
  const { tema } = useTema();

  return (
    <View style={[styles.header, { backgroundColor: tema.header }]}>
      <Text style={[styles.headerText, { color: tema.headerText }]}>
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

export default Encabezado;