import React from 'react';
import {
  Sparkles,
  Utensils,
  Bot,
  Users,
  Recycle,
  Trophy,
  Flame,
  Clock,
  Plus,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HomeScreen: React.FC = () => {
  const { user, foodItems, navigateTo, addToCart, setSelectedFoodDetail } = useApp();

  // Highlighted today's recommended meal
  const recommendedMeal = foodItems[1] || foodItems[0]; // Millet Bowl or Idli Sambar

  const quickActions = [
    {
      id: 'menu',
      label: 'Order Food',
      icon: '🍱',
      LucideIcon: Utensils,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      action: () => navigateTo('menu'),
      desc: 'Fresh kitchen menu',
    },
    {
      id: 'planner',
      label: 'AI Planner',
      icon: '🤖',
      LucideIcon: Bot,
      color: 'bg-teal-50 text-teal-800 border-teal-200',
      action: () => navigateTo('planner'),
      desc: 'Dietary match',
    },
    {
      id: 'group-orders',
      label: 'Group Order',
      icon: '👥',
      LucideIcon: Users,
      color: 'bg-blue-50 text-blue-800 border-blue-200',
      action: () => navigateTo('group-orders'),
      desc: 'Bulk discounts',
    },
    {
      id: 'food-waste',
      label: 'Food Waste',
      icon: '♻️',
      LucideIcon: Recycle,
      color: 'bg-lime-50 text-lime-800 border-lime-200',
      action: () => navigateTo('food-waste'),
      desc: 'Zero-waste log',
    },
    {
      id: 'challenges',
      label: 'Health Challenge',
      icon: '🏆',
      LucideIcon: Trophy,
      color: 'bg-amber-50 text-amber-800 border-amber-200',
      action: () => navigateTo('challenges'),
      desc: 'Earn eco points',
    },
  ];

  const mealSlots = [
    {
      name: 'Breakfast',
      timing: '7:30 AM – 10:00 AM',
      status: 'Ready Now',
      popular: 'Steamed Idli & Sambar / Ragi Dosa',
      isCurrent: true,
    },
    {
      name: 'Lunch',
      timing: '12:30 PM – 2:30 PM',
      status: 'Kitchen Prepping',
      popular: 'Paneer Millet Bowl & Vegetable Broth',
      isCurrent: false,
    },
    {
      name: 'Dinner',
      timing: '7:30 PM – 9:30 PM',
      status: 'Pre-order Open',
      popular: 'Light Ven Pongal & Steamed Dal',
      isCurrent: false,
    },
  ];

  return (
    <div className="p-4 space-y-5">
      {/* Greeting & Community Banner */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-display">
            Good Morning, {user?.name.split(' ')[0] || 'Resident'} 👋
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {user?.community || 'Greenfield Heights Residency'} · {user?.flatNumber || 'Tower B'}
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>{user?.wellnessScore || 88} Wellness Score</span>
        </div>
      </div>

      {/* Quick Actions Grid (5 Key Actions requested) */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Quick Actions</h3>
          <span className="text-[11px] text-slate-400">Tap to jump</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {quickActions.map((qa, index) => (
            <button
              key={qa.id}
              onClick={qa.action}
              className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all hover:shadow-xs active:scale-[0.98] cursor-pointer ${qa.color} ${
                index === 4 ? 'col-span-2 sm:col-span-1' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl">{qa.icon}</span>
                <span className="text-[10px] opacity-70 font-mono">0{index + 1}</span>
              </div>
              <div className="mt-2">
                <div className="text-xs font-bold text-slate-900 leading-tight">{qa.label}</div>
                <div className="text-[10px] text-slate-600 truncate mt-0.5">{qa.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Today's Recommended Meal Card */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Today's Recommended Meal</h3>
          </div>
          <button
            onClick={() => navigateTo('planner')}
            className="text-xs font-medium text-emerald-700 hover:text-emerald-800 flex items-center gap-0.5 cursor-pointer"
          >
            <span>Personalize</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
          <div className="relative h-44 w-full bg-emerald-50">
            <img
              src={recommendedMeal.image}
              alt={recommendedMeal.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => setSelectedFoodDetail(recommendedMeal)}
            />
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/95 text-xs font-semibold text-slate-800 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Chef's Choice</span>
            </div>
            <div className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-xs font-semibold font-mono">
              ₹{recommendedMeal.price}
            </div>
          </div>

          <div className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 
                  onClick={() => setSelectedFoodDetail(recommendedMeal)}
                  className="font-bold text-base text-slate-900 hover:text-emerald-700 cursor-pointer font-display"
                >
                  {recommendedMeal.name}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{recommendedMeal.description}</p>
              </div>
            </div>

            {/* Nutrition metrics */}
            <div className="flex items-center gap-3 text-xs text-slate-600 pt-1 border-t border-slate-100">
              <span className="flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                <strong className="font-mono">{recommendedMeal.calories}</strong> kcal
              </span>
              <span>·</span>
              <span>
                <strong className="font-mono">{recommendedMeal.protein}</strong> protein
              </span>
              <span>·</span>
              <span className="text-emerald-700 font-medium">Foxtail Millet + Spices</span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setSelectedFoodDetail(recommendedMeal)}
                className="flex-1 py-2 px-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors cursor-pointer"
              >
                View Ingredients
              </button>
              <button
                onClick={() => addToCart(recommendedMeal)}
                className="flex-1 py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs shadow-emerald-700/20 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Order Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Meals Timeline */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Today's Meals Schedule</h3>
          <button
            onClick={() => navigateTo('menu')}
            className="text-xs font-medium text-emerald-700 hover:text-emerald-800 cursor-pointer"
          >
            Full Menu
          </button>
        </div>

        <div className="space-y-2">
          {mealSlots.map((slot, i) => (
            <div
              key={i}
              className={`p-3 rounded-2xl border transition-all ${
                slot.isCurrent
                  ? 'bg-white border-emerald-300 shadow-xs'
                  : 'bg-white/80 border-slate-200/90'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      slot.isCurrent ? 'bg-emerald-600 animate-ping' : 'bg-slate-300'
                    }`}
                  />
                  <span className="text-xs font-bold text-slate-900">{slot.name}</span>
                  <span className="text-[11px] text-slate-400 font-mono">({slot.timing})</span>
                </div>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                    slot.isCurrent
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {slot.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 pl-4 truncate">{slot.popular}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Community Impact Mini Widget */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-800 to-teal-900 text-white shadow-sm flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-200 text-xs font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Community Wellness Pulse</span>
          </div>
          <p className="text-xs text-emerald-100/80">
            91.4% Zero-Waste meals recorded this week!
          </p>
        </div>
        <button
          onClick={() => navigateTo('food-waste')}
          className="px-3 py-1.5 rounded-xl bg-white text-emerald-900 text-xs font-bold hover:bg-emerald-50 active:scale-95 transition-all cursor-pointer shrink-0"
        >
          Log Plate
        </button>
      </div>
    </div>
  );
};
