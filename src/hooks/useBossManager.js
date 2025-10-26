import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBoss, updateBoss, deleteBoss } from '../store';

export const useBossManager = () => {
  const dispatch = useDispatch();
  const [notification, setNotification] = useState('');

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleAddBoss = (bossData) => {
    const newBoss = {
      ...bossData,
      id: Date.now().toString(),
      completed: false,
      attempts: parseInt(bossData.attempts) || 0
    };
    dispatch(addBoss(newBoss));
    showNotification(`¡${bossData.name} agregado!`);
  };

  const handleUpdateBoss = (bossData) => {
    dispatch(updateBoss(bossData));
    showNotification(`¡${bossData.name} actualizado!`);
  };

  const handleDeleteBoss = (bossId, bossName) => {
    dispatch(deleteBoss(bossId));
    showNotification(`¡${bossName} eliminado!`);
  };

  return {
    notification,
    handleAddBoss,
    handleUpdateBoss,
    handleDeleteBoss,
    showNotification
  };
};