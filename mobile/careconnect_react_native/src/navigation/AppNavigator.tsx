import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useCareConnect } from '../context/AppContext';
import { AccessibilityScreen } from '../screens/AccessibilityScreen';
import { AppointmentsScreen } from '../screens/AppointmentsScreen';
import { CarePlanScreen } from '../screens/CarePlanScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { MedicationsScreen } from '../screens/MedicationsScreen';
import { MyHealthScreen } from '../screens/MyHealthScreen';
import { ScheduleScreen } from '../screens/ScheduleScreen';
import { SignInScreen } from '../screens/SignInScreen';

type MainTabsParamList = {
  Home: undefined;
  Medications: undefined;
  Appointments: undefined;
  'Care Plan': undefined;
  Schedule: undefined;
  'My Health': undefined;
  Accessibility: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();

export function AppNavigator() {
  const { role, activeTheme } = useCareConnect();

  if (!role) {
    return (
      <NavigationContainer>
        <SignInScreen />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: activeTheme.primary,
          },
          headerTintColor: '#FFFFFF',
          tabBarActiveTintColor: activeTheme.primary,
          tabBarInactiveTintColor: activeTheme.mutedText,
          tabBarStyle: {
            backgroundColor: activeTheme.surface,
            borderTopColor: activeTheme.border,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
          },
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Medications" component={MedicationsScreen} />
        <Tab.Screen name="Appointments" component={AppointmentsScreen} />
        <Tab.Screen name="Care Plan" component={CarePlanScreen} />
        <Tab.Screen name="Schedule" component={ScheduleScreen} />
        <Tab.Screen name="My Health" component={MyHealthScreen} />
        <Tab.Screen name="Accessibility" component={AccessibilityScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
