import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

import HomeScreen from '../screens/HomeScreen';
import BossFormScreen from '../screens/BossFormScreen';
import AchievementsScreen from '../screens/AchievementsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BossStack() {
  const { theme } = useTheme();
  
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
          headerStyle: { backgroundColor: theme.header },
          headerTintColor: theme.headerText,
          headerTitleStyle: { color: theme.headerText }
        }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { theme } = useTheme();

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
          tabBarActiveTintColor: theme.tabBarActive,
          tabBarInactiveTintColor: theme.tabBarInactive,
          tabBarStyle: { 
            backgroundColor: theme.tabBar,
          },
          headerStyle: { 
            backgroundColor: theme.header,
          },
          headerTintColor: theme.headerText,
          headerTitleStyle: { 
            color: theme.headerText,
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