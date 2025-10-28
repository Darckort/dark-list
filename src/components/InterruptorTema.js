import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTema } from '../context/ContextoTema';

const InterruptorTema = () => {
  const { modoOscuro, alternarTema, tema } = useTema();

  return (
    <TouchableOpacity 
      style={[styles.toggleButton, { backgroundColor: tema.card }]}
      onPress={alternarTema}
    >
      <Ionicons 
        name={modoOscuro ? "sunny" : "moon"} 
        size={24} 
        color={tema.primary} 
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

export default InterruptorTema;