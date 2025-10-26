import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeContext';

import AchievementCard from '../components/AchievementCard';
import Header from '../components/Header';

const AchievementsScreen = () => {
  const achievements = useSelector(state => state.achievements.achievements);
  const { theme } = useTheme();
  
  const completedAchievements = achievements.filter(ach => ach.completed).length;
  const totalAchievements = achievements.length;
  const completionPercentage = totalAchievements > 0 ? Math.round((completedAchievements / totalAchievements) * 100) : 0;

  const renderAchievementItem = ({ item }) => (
    <AchievementCard achievement={item} />
  );

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      
      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{completedAchievements}</Text>
          <Text style={styles.statLabel}>Completados</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{totalAchievements}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{completionPercentage}%</Text>
          <Text style={styles.statLabel}>Progreso</Text>
        </View>
      </View>

      {/* Barra de Progresión */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${completionPercentage}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {completedAchievements} de {totalAchievements} logros completados
        </Text>
      </View>

      {/* Logros Lista */}
      <FlatList
        data={achievements}
        renderItem={renderAchievementItem}
        keyExtractor={item => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: theme.statsCard,
    margin: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.gold,
  },
  statLabel: {
    fontSize: 12,
    color: theme.textSecondary,
    marginTop: 4,
  },
  progressContainer: {
    backgroundColor: theme.statsCard,
    padding: 15,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  progressBar: {
    height: 10,
    backgroundColor: theme.progressBar,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.gold,
    borderRadius: 5,
  },
  progressText: {
    fontSize: 14,
    color: theme.textSecondary,
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
});

export default AchievementsScreen;