import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Flame,
  Dumbbell,
  Check,
  RefreshCw,
  Plus,
  ShoppingBag,
  Info,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FoodItem } from '../../types';

export const AiMealPlannerScreen: React.FC = () => {
  const { foodItems, addToCart, navigateTo } = useApp();

  // User preference filters
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([
    'Healthy',
    'Vegetarian',
  ]);

  const [isGenerating, setIsGenerating] = useState(false);

  const preferenceOptions = [
    { id: 'Healthy', label: 'Healthy & Balanced', icon: '🥗' },
    { id: 'Vegetarian', label: 'Vegetarian', icon: '🌱' },
    { id: 'High Protein', label: 'High Protein', icon: '💪' },
    { id: 'Low Calorie', label: 'Low Calorie', icon: '🍃' },
    { id: 'Budget Friendly', label: 'Budget Friendly', icon: '💰' },
  ];

  const togglePreference = (pref: string) => {
    setSelectedPreferences(prev =>
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  // Recommendation engine based on active tags
  const getRecommendation = (): FoodItem => {
    if (selectedPreferences.includes('High Protein')) {
      return (
        foodItems.find(f => f.category === 'high-protein') ||
        foodItems.find(f => f.name.includes('Paneer')) ||
        foodItems[2]
      );
    }
    if (selectedPreferences.includes('Low Calorie')) {
      return (
        foodItems.find(f => f.category === 'soups') ||
        foodItems.find(f => f.calories <= 200) ||
        foodItems[3]
      );
    }
    if (selectedPreferences.includes('Budget Friendly')) {
      return [...foodItems].sort((a, b) => a.price - b.price)[0] || foodItems[0];
    }
    // Default healthy balanced
    return foodItems.find(f => f.id === 'food-2') || foodItems[0];
  };

  const currentRecommendation = getRecommendation();

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 400);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-2xl p-4 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
            <Bot className="w-4 h-4 text-emerald-200" />
          </div>
          <h2 className="text-sm font-bold font-display uppercase tracking-wider">
            Smart Community Dietitian
          </h2>
        </div>
        <p className="text-xs text-emerald-100/90 leading-relaxed">
          Select your dietary goals to calculate the optimal meal prepared fresh in your community central kitchen.
        </p>
      </div>

      {/* Selectable Dietary Preferences (Requested 5 items) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Select Your Meal Goals
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">
            {selectedPreferences.length} chosen
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {preferenceOptions.map(opt => {
            const isSelected = selectedPreferences.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => togglePreference(opt.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-700 border-emerald-700 text-white shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{opt.icon}</span>
                <span>{opt.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 ml-0.5" />}
              </button>
            );
          })}
        </div>

        <div className="pt-1 flex items-center justify-between">
          <p className="text-[11px] text-slate-400">
            Algorithmic macro balancing for resident health
          </p>
          <button
            onClick={handleRegenerate}
            disabled={isGenerating}
            className="flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>Recalculate</span>
          </button>
        </div>
      </div>

      {/* Recommended Meal Presentation */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Recommended Meal For You</span>
        </div>

        <div className="bg-white rounded-2xl border-2 border-emerald-500/80 overflow-hidden shadow-sm">
          {/* Meal Image */}
          <div className="relative h-48 w-full bg-emerald-50">
            <img
              src={currentRecommendation.image}
              alt={currentRecommendation.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/95 text-xs font-bold text-emerald-800 shadow-xs flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>98% Goal Match</span>
            </div>
            <div className="absolute bottom-3 right-3 px-3 py-1 rounded-md bg-slate-900/90 text-white text-sm font-bold font-mono">
              ₹{currentRecommendation.price}
            </div>
          </div>

          <div className="p-4 space-y-4">
            {/* Meal Header */}
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 font-display">
                    {currentRecommendation.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    {currentRecommendation.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Nutrients Breakdown */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-emerald-800 text-xs font-bold font-mono">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>{currentRecommendation.calories}</span>
                </div>
                <p className="text-[10px] text-emerald-700/80 mt-0.5">Calories (kcal)</p>
              </div>
              <div className="text-center border-x border-emerald-200/60">
                <div className="flex items-center justify-center gap-1 text-emerald-800 text-xs font-bold font-mono">
                  <Dumbbell className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{currentRecommendation.protein}</span>
                </div>
                <p className="text-[10px] text-emerald-700/80 mt-0.5">Protein</p>
              </div>
              <div className="text-center">
                <div className="text-xs font-bold text-emerald-800 font-mono">
                  {currentRecommendation.carbs}
                </div>
                <p className="text-[10px] text-emerald-700/80 mt-0.5">Complex Carbs</p>
              </div>
            </div>

            {/* Ingredients List */}
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-slate-800">Fresh Ingredients:</div>
              <div className="flex flex-wrap gap-1.5">
                {currentRecommendation.ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] rounded-md font-medium"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* AI Recommendation Rationale */}
            <div className="flex items-start gap-2 p-2.5 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-200">
              <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p>
                Matched specifically for your <strong>{selectedPreferences.join(', ')}</strong> preferences. High bioavailability, clean preparation, and zero excess sodium.
              </p>
            </div>

            {/* Actions: Order Now & Add to Cart */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => {
                  addToCart(currentRecommendation);
                }}
                className="flex-1 h-11 rounded-xl border border-emerald-700 text-emerald-800 hover:bg-emerald-50 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={() => {
                  addToCart(currentRecommendation);
                  navigateTo('cart');
                }}
                className="flex-1 h-11 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98] transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
