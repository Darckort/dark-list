import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet,
  Modal 
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useTema } from '../context/ContextoTema';

import BossCard from '../components/TarjetaJefe';
import Header from '../components/Header';
import { useGestorJefes } from '../hooks/useGestorJefes';
import { eliminarJefe } from '../store';

const PantallaInicio = ({ navigation }) => {
  const bosses = useSelector(state => state.jefes.jefes);
  const dispatch = useDispatch();
  const { tema } = useTema();
  const { notification, handleDeleteBoss } = useGestorJefes();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedBoss, setSelectedBoss] = useState(null);

  const completedBosses = bosses.filter(boss => boss.completed).length;
  const totalBosses = bosses.length;
  const completionPercentage = totalBosses > 0 ? Math.round((completedBosses / totalBosses) * 100) : 0;

  const handleEditBoss = (boss) => {
    navigation.navigate('BossForm', { boss });
  };

  const confirmDeleteBoss = (bossId, bossName) => {
    setSelectedBoss({ id: bossId, name: bossName });
    setDeleteModalVisible(true);
  };

  const executeDeleteBoss = () => {
    if (selectedBoss) {
      dispatch(eliminarJefe(selectedBoss.id));
      setDeleteModalVisible(false);
      setSelectedBoss(null);
    }
  };

  const renderBossItem = ({ item }) => (
    <BossCard 
      boss={item} 
      onEdit={handleEditBoss}
      onDelete={confirmDeleteBoss}
    />
  );

  const styles = createStyles(tema);

  return (
    <View style={styles.container}>
      <Header title="Jefes de Dark Souls" />
      
      {/* Estadisticas */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{completedBosses}</Text>
          <Text style={styles.statLabel}>Completados</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{totalBosses}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{completionPercentage}%</Text>
          <Text style={styles.statLabel}>Progreso</Text>
        </View>
      </View>

      {/* Notificacion */}
      {notification ? (
        <View style={styles.notification}>
          <Text style={styles.notificationText}>{notification}</Text>
        </View>
      ) : null}

      {/* Lista de Jefes */}
      <FlatList
        data={bosses}
        renderItem={renderBossItem}
        keyExtractor={item => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />

      {/* Añadir Boss */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('BossForm')}
      >
        <Ionicons name="add" size={24} color="#FFF" />
        <Text style={styles.addButtonText}>Agregar Jefe</Text>
      </TouchableOpacity>

      {/* Modal de Eliminar */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmar Eliminación</Text>
            <Text style={styles.modalMessage}>
              ¿Estás seguro de que quieres eliminar a "{selectedBoss?.name}"?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.deleteButton]}
                onPress={executeDeleteBoss}
              >
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    color: theme.primary,
  },
  statLabel: {
    fontSize: 12,
    color: theme.textSecondary,
    marginTop: 4,
  },
  notification: {
    backgroundColor: theme.success,
    padding: 10,
    marginHorizontal: 16,
    borderRadius: 4,
    marginBottom: 10,
  },
  notificationText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '500',
  },
  list: {
    flex: 1,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: theme.primary,
    padding: 15,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: theme.modalBackground,
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.text,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: theme.textSecondary,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: theme.card,
  },
  deleteButton: {
    backgroundColor: theme.danger,
  },
  cancelButtonText: {
    color: theme.text,
    fontWeight: '500',
  },
  deleteButtonText: {
    color: '#FFF',
    fontWeight: '500',
  },
});

export default PantallaInicio;