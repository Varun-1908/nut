import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AppScreen,
  CartItem,
  FoodItem,
  GroupOrderCampaign,
  HealthChallenge,
  LeaderboardUser,
  Order,
  OrderStatus,
  UserProfile,
  WasteFeedbackLevel,
  WasteSubmission,
} from '../types';
import {
  INITIAL_CHALLENGES,
  INITIAL_FOOD_ITEMS,
  INITIAL_GROUP_ORDERS,
  INITIAL_LEADERBOARD,
  INITIAL_USER,
} from '../data/mockData';

interface AppContextType {
  currentScreen: AppScreen;
  navigateTo: (screen: AppScreen) => void;
  user: UserProfile | null;
  foodItems: FoodItem[];
  cart: CartItem[];
  orders: Order[];
  groupOrders: GroupOrderCampaign[];
  challenges: HealthChallenge[];
  leaderboard: LeaderboardUser[];
  wasteSubmissions: WasteSubmission[];
  selectedFoodDetail: FoodItem | null;
  setSelectedFoodDetail: (item: FoodItem | null) => void;
  isPhoneFrame: boolean;
  togglePhoneFrame: () => void;
  toast: string | null;
  showToast: (message: string) => void;
  
  // Actions
  addToCart: (item: FoodItem, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  placeOrder: (notes?: string) => Order;
  advanceOrderStatus: (orderId: string) => void;
  joinGroupOrder: (groupId: string, portions?: number) => void;
  createGroupOrder: (campaign: Omit<GroupOrderCampaign, 'id' | 'currentCount' | 'joinedFlats' | 'isJoinedByCurrentUser'>) => void;
  submitWasteFeedback: (mealName: string, level: WasteFeedbackLevel, residentNote?: string) => void;
  updateChallengeProgress: (challengeId: string, amount: number) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  login: (email: string, flatNumber: string, communityName?: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');
  const [user, setUser] = useState<UserProfile | null>(INITIAL_USER);
  const [foodItems] = useState<FoodItem[]>(INITIAL_FOOD_ITEMS);
  const [cart, setCart] = useState<CartItem[]>([
    { foodItem: INITIAL_FOOD_ITEMS[0], quantity: 2 },
    { foodItem: INITIAL_FOOD_ITEMS[3], quantity: 1 },
  ]);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-8492',
      items: [
        { foodItem: INITIAL_FOOD_ITEMS[1], quantity: 1 },
        { foodItem: INITIAL_FOOD_ITEMS[6], quantity: 1 },
      ],
      totalAmount: 230,
      discountAmount: 20,
      finalAmount: 210,
      status: 'Preparing',
      createdAt: 'Today, 11:45 AM',
      estimatedDeliveryTime: '12:15 PM',
      deliveryFlat: 'Tower B · Flat 402',
      communityName: 'Greenfield Heights Residency',
      notes: 'Less oil, leave at door bench if not answered',
    },
    {
      id: 'ORD-8104',
      items: [
        { foodItem: INITIAL_FOOD_ITEMS[0], quantity: 2 },
      ],
      totalAmount: 160,
      discountAmount: 0,
      finalAmount: 160,
      status: 'Delivered',
      createdAt: 'Yesterday, 8:20 AM',
      estimatedDeliveryTime: 'Delivered at 8:42 AM',
      deliveryFlat: 'Tower B · Flat 402',
      communityName: 'Greenfield Heights Residency',
    },
  ]);
  const [groupOrders, setGroupOrders] = useState<GroupOrderCampaign[]>(INITIAL_GROUP_ORDERS);
  const [challenges, setChallenges] = useState<HealthChallenge[]>(INITIAL_CHALLENGES);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>(INITIAL_LEADERBOARD);
  const [wasteSubmissions, setWasteSubmissions] = useState<WasteSubmission[]>([
    {
      id: 'w-1',
      mealName: 'Idli & Sambar (Breakfast)',
      level: 'Finished',
      wastePercentage: 0,
      timestamp: 'Yesterday, 9:15 AM',
      ecoPointsAwarded: 25,
      residentNote: 'Perfect portion size. Zero leftover!',
    },
    {
      id: 'w-2',
      mealName: 'Ven Pongal (Dinner)',
      level: 'Small amount left',
      wastePercentage: 10,
      timestamp: '2 days ago',
      ecoPointsAwarded: 15,
      residentNote: 'Slightly more than I could finish, shared remainder with composting unit.',
    },
  ]);
  const [selectedFoodDetail, setSelectedFoodDetail] = useState<FoodItem | null>(null);
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);

  // Auto-hide toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3200);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message: string) => {
    setToast(message);
  };

  const navigateTo = (screen: AppScreen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const togglePhoneFrame = () => {
    setIsPhoneFrame(prev => !prev);
  };

  const addToCart = (item: FoodItem, quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(c => c.foodItem.id === item.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [...prev, { foodItem: item, quantity }];
    });
    showToast(`Added ${item.name} to cart`);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(c => c.foodItem.id !== itemId));
    showToast('Item removed from cart');
  };

  const updateCartQuantity = (itemId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(c => {
          if (c.foodItem.id === itemId) {
            const newQty = c.quantity + delta;
            return newQty > 0 ? { ...c, quantity: newQty } : null;
          }
          return c;
        })
        .filter((c): c is CartItem => c !== null);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (notes?: string): Order => {
    const totalAmount = cart.reduce((sum, item) => sum + item.foodItem.price * item.quantity, 0);
    const discountAmount = totalAmount >= 200 ? 25 : 0;
    const finalAmount = Math.max(0, totalAmount - discountAmount);

    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      items: [...cart],
      totalAmount,
      discountAmount,
      finalAmount,
      status: 'Placed',
      createdAt: 'Just now',
      estimatedDeliveryTime: 'In 25-30 mins',
      deliveryFlat: user?.flatNumber || 'Tower B · Flat 402',
      communityName: user?.community || 'Greenfield Heights Residency',
      notes,
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    if (user) {
      setUser(u => u ? { ...u, mealsOrderedCount: u.mealsOrderedCount + 1 } : null);
    }
    showToast(`Order #${newOrder.id} placed successfully!`);
    return newOrder;
  };

  const advanceOrderStatus = (orderId: string) => {
    const statusFlow: OrderStatus[] = ['Placed', 'Confirmed', 'Preparing', 'Ready', 'Delivered'];
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          const currentIndex = statusFlow.indexOf(ord.status);
          if (currentIndex < statusFlow.length - 1) {
            const nextStatus = statusFlow[currentIndex + 1];
            showToast(`Order status updated to: ${nextStatus}`);
            return { ...ord, status: nextStatus };
          }
        }
        return ord;
      })
    );
  };

  const joinGroupOrder = (groupId: string, portions = 1) => {
    setGroupOrders(prev =>
      prev.map(campaign => {
        if (campaign.id === groupId) {
          const userFlat = user?.flatNumber || 'Tower B · Flat 402';
          const userName = user?.name || 'Resident';
          const alreadyJoined = campaign.joinedFlats.some(j => j.flat === userFlat);
          
          if (alreadyJoined) {
            showToast('You are already part of this group order!');
            return campaign;
          }

          const updatedFlats = [
            ...campaign.joinedFlats,
            {
              flat: userFlat,
              residentName: userName,
              avatarLetter: userName.charAt(0).toUpperCase(),
              portionCount: portions,
            },
          ];

          showToast(`Joined ${campaign.title}! ₹${campaign.regularPrice - campaign.discountedPrice} saved.`);
          return {
            ...campaign,
            currentCount: campaign.currentCount + portions,
            joinedFlats: updatedFlats,
            isJoinedByCurrentUser: true,
          };
        }
        return campaign;
      })
    );
  };

  const createGroupOrder = (
    campaignData: Omit<GroupOrderCampaign, 'id' | 'currentCount' | 'joinedFlats' | 'isJoinedByCurrentUser'>
  ) => {
    const newCampaign: GroupOrderCampaign = {
      ...campaignData,
      id: `grp-${Date.now()}`,
      currentCount: 1,
      isJoinedByCurrentUser: true,
      joinedFlats: [
        {
          flat: user?.flatNumber || 'Tower B · Flat 402',
          residentName: user?.name || 'Resident',
          avatarLetter: (user?.name || 'R').charAt(0).toUpperCase(),
          portionCount: 1,
        },
      ],
    };

    setGroupOrders(prev => [newCampaign, ...prev]);
    showToast(`Created community group order: "${newCampaign.title}"`);
  };

  const submitWasteFeedback = (mealName: string, level: WasteFeedbackLevel, residentNote?: string) => {
    const wastePercentageMap: Record<WasteFeedbackLevel, number> = {
      Finished: 0,
      'Small amount left': 15,
      'Half left': 50,
      'Most left': 80,
    };

    const ecoPointsMap: Record<WasteFeedbackLevel, number> = {
      Finished: 30,
      'Small amount left': 20,
      'Half left': 10,
      'Most left': 5,
    };

    const points = ecoPointsMap[level];
    const newSubmission: WasteSubmission = {
      id: `w-${Date.now()}`,
      mealName,
      level,
      wastePercentage: wastePercentageMap[level],
      timestamp: 'Just now',
      ecoPointsAwarded: points,
      residentNote,
    };

    setWasteSubmissions(prev => [newSubmission, ...prev]);
    if (user) {
      setUser(u => (u ? { ...u, ecoPoints: u.ecoPoints + points } : null));
    }
    showToast(`Thank you! +${points} Eco Points earned for feedback.`);
  };

  const updateChallengeProgress = (challengeId: string, amount: number) => {
    setChallenges(prev =>
      prev.map(ch => {
        if (ch.id === challengeId) {
          const nextVal = Math.min(ch.goalProgress, ch.currentProgress + amount);
          const completed = nextVal >= ch.goalProgress;
          if (completed && !ch.isCompleted) {
            showToast(`🎉 Challenge Unlocked: "${ch.badgeName}" (+${ch.points} pts)!`);
            if (user) {
              setUser(u => (u ? { ...u, wellnessScore: Math.min(100, u.wellnessScore + 5) } : null));
            }
          }
          return {
            ...ch,
            currentProgress: nextVal,
            isCompleted: completed,
          };
        }
        return ch;
      })
    );
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUser(prev => (prev ? { ...prev, ...updates } : null));
    showToast('Profile updated successfully');
  };

  const login = (email: string, flatNumber: string, communityName = 'Greenfield Heights Residency') => {
    const name = email.split('@')[0] || 'Resident';
    setUser({
      id: `usr-${Date.now()}`,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email,
      flatNumber: flatNumber || 'Tower B · Flat 402',
      community: communityName,
      phone: '+91 98765 43210',
      foodPreferences: ['Vegetarian', 'High Protein'],
      allergies: ['Peanuts'],
      ecoPoints: 350,
      wellnessScore: 85,
      mealsOrderedCount: 12,
      joinedDate: 'Feb 2026',
    });
    navigateTo('home');
    showToast(`Welcome back, ${name}!`);
  };

  const logout = () => {
    setUser(null);
    navigateTo('login');
    showToast('Logged out');
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        navigateTo,
        user,
        foodItems,
        cart,
        orders,
        groupOrders,
        challenges,
        leaderboard,
        wasteSubmissions,
        selectedFoodDetail,
        setSelectedFoodDetail,
        isPhoneFrame,
        togglePhoneFrame,
        toast,
        showToast,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        placeOrder,
        advanceOrderStatus,
        joinGroupOrder,
        createGroupOrder,
        submitWasteFeedback,
        updateChallengeProgress,
        updateUserProfile,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
