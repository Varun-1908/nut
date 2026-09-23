export type DietaryType = 'veg' | 'non-veg';

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  isVeg: boolean;
  category: 'breakfast' | 'bowls' | 'soups' | 'high-protein' | 'specials';
  image: string;
  tags: string[];
  ingredients: string[];
  rating: number;
  prepTimeMinutes: number;
}

export interface CartItem {
  foodItem: FoodItem;
  quantity: number;
  specialInstructions?: string;
}

export type OrderStatus = 'Placed' | 'Confirmed' | 'Preparing' | 'Ready' | 'Delivered';

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  status: OrderStatus;
  createdAt: string;
  estimatedDeliveryTime: string;
  deliveryFlat: string;
  communityName: string;
  notes?: string;
  isGroupOrder?: boolean;
}

export interface GroupOrderCampaign {
  id: string;
  title: string;
  mealName: string;
  description: string;
  deliverySlot: string;
  regularPrice: number;
  discountedPrice: number;
  targetCount: number;
  currentCount: number;
  joinedFlats: {
    flat: string;
    residentName: string;
    avatarLetter: string;
    portionCount: number;
  }[];
  expiresInMinutes: number;
  isJoinedByCurrentUser: boolean;
  image: string;
}

export type WasteFeedbackLevel = 'Finished' | 'Small amount left' | 'Half left' | 'Most left';

export interface WasteSubmission {
  id: string;
  orderId?: string;
  mealName: string;
  level: WasteFeedbackLevel;
  wastePercentage: number;
  residentNote?: string;
  timestamp: string;
  ecoPointsAwarded: number;
}

export interface HealthChallenge {
  id: string;
  title: string;
  subtitle: string;
  category: 'nutrition' | 'fitness' | 'hydration' | 'eco';
  currentProgress: number;
  goalProgress: number;
  unit: string;
  points: number;
  badgeName: string;
  isCompleted: boolean;
  icon: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  flat: string;
  points: number;
  streakDays: number;
  avatarColor: string;
  isCurrentUser?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  flatNumber: string;
  community: string;
  phone: string;
  foodPreferences: string[];
  allergies: string[];
  ecoPoints: number;
  wellnessScore: number;
  mealsOrderedCount: number;
  joinedDate: string;
}

export type AppScreen =
  | 'splash'
  | 'login'
  | 'home'
  | 'menu'
  | 'planner'
  | 'cart'
  | 'orders'
  | 'group-orders'
  | 'food-waste'
  | 'challenges'
  | 'profile';
