import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { useTheme } from '../context/ThemeContext';
import { toggleBossCompletion, incrementAttempts } from '../store';

const BossCard = ({ boss, onEdit, onDelete }) => {
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const handleToggleCompletion = () => {
    dispatch(toggleBossCompletion(boss.id));
  };

  const handleIncrementAttempts = () => {
    dispatch(incrementAttempts(boss.id));
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return theme.success;
      case 'Medium': return theme.warning;
      case 'Hard': return theme.danger;
      case 'Very Hard': return theme.primary;
      default: return theme.textMuted;
    }
  };

  const styles = createStyles(theme);

  return (
    <View style={[styles.card, boss.completed && styles.completedCard]}>
      <View style={styles.header}>
        <Text style={styles.name}>{boss.name}</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => onEdit(boss)} style={styles.actionButton}>
            <Ionicons name="create-outline" size={20} color={theme.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(boss.id, boss.name)} style={styles.actionButton}>
            <Ionicons name="trash-outline" size={20} color={theme.danger} />
          </TouchableOpacity>
        </View>
      </View>
      
      <Text style={styles.location}>{boss.location}</Text>
      
      <View style={styles.details}>
        <View style={[styles.difficulty, { backgroundColor: getDifficultyColor(boss.difficulty) }]}>
          <Text style={styles.difficultyText}>{boss.difficulty}</Text>
        </View>
        <Text style={styles.attempts}>Intentos: {boss.attempts}</Text>
      </View>

      {boss.notes ? (
        <Text style={styles.notes}>Notas: {boss.notes}</Text>
      ) : null}

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.completeButton]}
          onPress={handleToggleCompletion}
        >
          <Ionicons 
            name={boss.completed ? "checkmark-circle" : "checkmark-circle-outline"} 
            size={20} 
            color={boss.completed ? theme.success : theme.textMuted} 
          />
          <Text style={styles.buttonText}>
            {boss.completed ? 'Completado' : 'Completar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.attemptButton]}
          onPress={handleIncrementAttempts}
        >
          <Ionicons name="add-circle-outline" size={20} color={theme.warning} />
          <Text style={styles.buttonText}>Intento</Text>
        </TouchableOpacity>
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
    backgroundColor: theme.isDarkMode ? '#1A2A1A' : '#F0F8F0',
    borderLeftWidth: 4,
    borderLeftColor: theme.success,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 5,
    marginLeft: 10,
  },
  location: {
    fontSize: 14,
    color: theme.textSecondary,
    marginBottom: 10,
    fontStyle: 'italic',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  difficulty: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  attempts: {
    fontSize: 14,
    color: theme.textSecondary,
  },
  notes: {
    fontSize: 14,
    color: theme.textMuted,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 6,
    backgroundColor: theme.isDarkMode ? '#2A2A2A' : '#F5F5F5',
    flex: 1,
    marginRight: 5,
    justifyContent: 'center',
  },
  attemptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 6,
    backgroundColor: theme.isDarkMode ? '#2A2A2A' : '#FFF3E0',
    flex: 1,
    marginLeft: 5,
    justifyContent: 'center',
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500',
    color: theme.text,
  },
});

export default BossCard;