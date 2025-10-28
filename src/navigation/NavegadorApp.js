import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTema } from '../context/ContextoTema';

import HomeScreen from '../screens/PantallaInicio';
import BossFormScreen from '../screens/PantallaFormularioJefe';
import AchievementsScreen from '../screens/PantallaLogros';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BossStack() {
  const { tema } = useTema();
  
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ 
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="BossForm" 
        component={BossFormScreen}
        options={{ 
          title: 'Gestionar Jefe',
          headerStyle: { backgroundColor: tema.header },
          headerTintColor: tema.headerText,
          headerTitleStyle: { color: tema.headerText }
        }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { tema } = useTema();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Jefes') {
              iconName = focused ? 'skull' : 'skull-outline';
            } else if (route.name === 'Logros') {
              iconName = focused ? 'trophy' : 'trophy-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: tema.tabBarActive,
          tabBarInactiveTintColor: tema.tabBarInactive,
          tabBarStyle: { 
            backgroundColor: tema.tabBar,
          },
          headerStyle: { 
            backgroundColor: tema.header,
          },
          headerTintColor: tema.headerText,
          headerTitleStyle: { 
            color: tema.headerText,
          },
        })}
      >
        <Tab.Screen 
          name="Jefes" 
          component={BossStack}
          options={{ 
            headerShown: false 
          }}
        />
        <Tab.Screen 
          name="Logros" 
          component={AchievementsScreen}
          options={{
            title: 'Logros de Dark Souls'
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}