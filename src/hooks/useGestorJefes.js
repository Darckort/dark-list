import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { agregarJefe, actualizarJefe, eliminarJefe } from '../store';

export const useGestorJefes = () => {
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
    dispatch(agregarJefe(newBoss));

    showNotification(`¡${bossData.name} agregado!`);
  };

  const handleUpdateBoss = (bossData) => {
    dispatch(actualizarJefe(bossData));

    showNotification(`¡${bossData.name} actualizado!`);
  };

  const handleDeleteBoss = (bossId, bossName) => {
    dispatch(eliminarJefe(bossId));

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