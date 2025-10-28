import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import AppNavigator from './src/navigation/NavegadorApp';
import { ProveedorTema } from './src/context/ContextoTema';

export default function App() {
  return (
    <ProveedorTema>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </ProveedorTema>
  );
}