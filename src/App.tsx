/**
 * NutriNest - Smart Food. Healthy Community.
 * Modern community catering and wellness app for gated communities.
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { MobileFrame } from './components/layout/MobileFrame';
import { SplashScreen } from './components/screens/SplashScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { MenuScreen } from './components/screens/MenuScreen';
import { AiMealPlannerScreen } from './components/screens/AiMealPlannerScreen';
import { CartScreen } from './components/screens/CartScreen';
import { OrdersScreen } from './components/screens/OrdersScreen';
import { GroupOrderScreen } from './components/screens/GroupOrderScreen';
import { FoodWasteScreen } from './components/screens/FoodWasteScreen';
import { HealthChallengeScreen } from './components/screens/HealthChallengeScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { FoodDetailModal } from './components/common/FoodDetailModal';
import { Toast } from './components/common/Toast';

const AppContent: React.FC = () => {
  const { currentScreen, selectedFoodDetail, setSelectedFoodDetail, toast } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'login':
        return <LoginScreen />;
      case 'home':
        return <HomeScreen />;
      case 'menu':
        return <MenuScreen />;
      case 'planner':
        return <AiMealPlannerScreen />;
      case 'cart':
        return <CartScreen />;
      case 'orders':
        return <OrdersScreen />;
      case 'group-orders':
        return <GroupOrderScreen />;
      case 'food-waste':
        return <FoodWasteScreen />;
      case 'challenges':
        return <HealthChallengeScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <MobileFrame>
      {renderScreen()}
      <FoodDetailModal
        item={selectedFoodDetail}
        onClose={() => setSelectedFoodDetail(null)}
      />
      <Toast message={toast} />
    </MobileFrame>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
