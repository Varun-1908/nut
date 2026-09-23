import React, { useState } from 'react';
import { Search, Plus, Minus, Flame, Dumbbell, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FoodItem } from '../../types';

export const MenuScreen: React.FC = () => {
  const { foodItems, cart, addToCart, updateCartQuantity, setSelectedFoodDetail } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);

  const categories = [
    { id: 'all', label: 'All Dishes' },
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'bowls', label: 'Millet & Bowls' },
    { id: 'high-protein', label: 'High Protein' },
    { id: 'soups', label: 'Soups & Light' },
    { id: 'specials', label: 'Fresh Bowls' },
  ];

  const filteredItems = foodItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesVeg = !vegOnly || item.isVeg;
    return matchesCategory && matchesQuery && matchesVeg;
  });

  const getItemCartQty = (id: string) => {
    const found = cart.find(c => c.foodItem.id === id);
    return found ? found.quantity : 0;
  };

  return (
    <div className="p-4 space-y-4">
      {/* Search and Veg Toggle */}
      <div className="space-y-2.5">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search idli, millet bowl, soup, protein..."
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filter Indicator */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>
            Showing <strong className="text-slate-800 font-mono">{filteredItems.length}</strong> community kitchen dishes
          </span>
          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border transition-colors cursor-pointer ${
              vegOnly
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>Pure Veg Only</span>
          </button>
        </div>
      </div>

      {/* Food Cards Grid */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
            <Filter className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs font-semibold text-slate-700">No matching dishes found</p>
            <p className="text-[11px] text-slate-400">Try adjusting your search terms or filters</p>
          </div>
        ) : (
          filteredItems.map(item => {
            const inCartQty = getItemCartQty(item.id);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-3.5 flex gap-3.5 shadow-xs hover:shadow-sm transition-all"
              >
                {/* Left Food Image */}
                <div
                  onClick={() => setSelectedFoodDetail(item)}
                  className="relative w-28 h-28 rounded-xl overflow-hidden bg-emerald-50 shrink-0 cursor-pointer group"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  {/* Veg/Non-Veg Badge */}
                  <div className="absolute top-1.5 left-1.5 w-4 h-4 rounded-sm bg-white/90 border border-slate-300 flex items-center justify-center">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        item.isVeg ? 'bg-emerald-600' : 'bg-red-600'
                      }`}
                    />
                  </div>
                </div>

                {/* Right Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4
                        onClick={() => setSelectedFoodDetail(item)}
                        className="text-sm font-bold text-slate-900 hover:text-emerald-700 cursor-pointer font-display leading-snug"
                      >
                        {item.name}
                      </h4>
                      <span className="text-sm font-bold text-emerald-800 font-mono shrink-0">
                        ₹{item.price}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Nutrition metrics */}
                  <div className="flex items-center gap-2.5 text-[11px] text-slate-500 mt-2">
                    <span className="flex items-center gap-0.5 font-mono">
                      <Flame className="w-3 h-3 text-amber-500" />
                      {item.calories} kcal
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-0.5 font-mono">
                      <Dumbbell className="w-3 h-3 text-emerald-600" />
                      {item.protein}
                    </span>
                  </div>

                  {/* Action row */}
                  <div className="flex items-center justify-between pt-2 mt-1 border-t border-slate-100">
                    <button
                      onClick={() => setSelectedFoodDetail(item)}
                      className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 underline decoration-slate-300 underline-offset-2 cursor-pointer"
                    >
                      Details & Macros
                    </button>

                    {inCartQty > 0 ? (
                      <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg p-0.5">
                        <button
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-md bg-white text-emerald-800 flex items-center justify-center hover:bg-emerald-100 cursor-pointer shadow-2xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-emerald-800 font-mono px-1">
                          {inCartQty}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-md bg-emerald-700 text-white flex items-center justify-center hover:bg-emerald-800 cursor-pointer shadow-2xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1 shadow-2xs active:scale-95 transition-all cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
