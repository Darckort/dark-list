import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { useTema } from '../context/ContextoTema';
import { alternarLogro } from '../store';

const TarjetaLogro = ({ achievement }) => {
  const dispatch = useDispatch();
  const { tema } = useTema();

  const handleToggleAchievement = () => {
    // PARA EL LOGRO FINAL
    if (achievement.id === '1') {
      return;
    }
    dispatch(alternarLogro(achievement.id));
  };

  const isDarkSoulAchievement = achievement.id === '1';
  const styles = createStyles(tema);

  return (
    <View style={[
      styles.card, 
      achievement.completed && styles.completedCard,
      isDarkSoulAchievement && styles.darkSoulCard
    ]}>
      <View style={styles.header}>
        <Ionicons 
          name={achievement.completed ? "trophy" : "trophy-outline"} 
          size={24} 
          color={achievement.completed ? tema.gold : tema.textMuted} 
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{achievement.title}</Text>
          <Text style={styles.description}>{achievement.description}</Text>
        </View>
        <TouchableOpacity 
          onPress={handleToggleAchievement}
          style={styles.toggleButton}
          disabled={isDarkSoulAchievement}
        >
          <Ionicons 
            name={
              isDarkSoulAchievement ? "lock-closed" : 
              achievement.completed ? "checkmark-circle" : "ellipse-outline"
            } 
            size={28} 
            color={
              isDarkSoulAchievement ? tema.textMuted :
              achievement.completed ? tema.success : tema.textMuted
            } 
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.requirement}>
        <Text style={styles.requirementText}>Requisito: {achievement.requirement}</Text>
        {isDarkSoulAchievement && (
          <Text style={styles.autoCompleteText}>
            (Se completa automáticamente al conseguir todos los demás logros)
          </Text>
        )}
      </View>
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  card: {
    backgroundColor: theme.card,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: theme.border,
  },
  completedCard: {
    backgroundColor: theme.isDarkMode ? '#2A2A1A' : '#FFF8E1',
    borderLeftWidth: 4,
    borderLeftColor: theme.gold,
  },
  darkSoulCard: {
    backgroundColor: theme.isDarkMode ? '#1A1A2A' : '#F0F0FF',
    borderLeftWidth: 4,
    borderLeftColor: theme.isDarkMode ? '#6666FF' : '#3333FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.text,
  },
  description: {
    fontSize: 14,
    color: theme.textSecondary,
    marginTop: 2,
  },
  toggleButton: {
    padding: 4,
  },
  requirement: {
    backgroundColor: theme.isDarkMode ? '#2A2A2A' : '#F5F5F5',
    padding: 8,
    borderRadius: 4,
  },
  requirementText: {
    fontSize: 12,
    color: theme.textMuted,
    fontStyle: 'italic',
  },
  autoCompleteText: {
    fontSize: 10,
    color: theme.textMuted,
    fontStyle: 'italic',
    marginTop: 4,
  },
});

export default TarjetaLogro;