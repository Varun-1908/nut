import React from 'react';
import { X, Flame, Dumbbell, Clock, Plus, ShieldCheck, Sparkles } from 'lucide-react';
import { FoodItem } from '../../types';
import { useApp } from '../../context/AppContext';

interface FoodDetailModalProps {
  item: FoodItem | null;
  onClose: () => void;
}

export const FoodDetailModal: React.FC<FoodDetailModalProps> = ({ item, onClose }) => {
  const { addToCart } = useApp();

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in slide-in-from-bottom-6 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Image header with close button */}
        <div className="relative h-56 w-full bg-emerald-50 shrink-0">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 shadow-md hover:bg-white transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="absolute bottom-3 left-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/95 text-slate-800 text-xs font-semibold shadow-xs">
              <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-emerald-600' : 'bg-red-600'}`} />
              {item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/95 text-slate-800 text-xs font-medium shadow-xs">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              {item.prepTimeMinutes} mins prep
            </span>
          </div>
        </div>

        {/* Content area */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">{item.name}</h2>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">{item.description}</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-2xl font-bold text-emerald-800 font-mono">₹{item.price}</span>
              <p className="text-[11px] text-slate-400">Community rate</p>
            </div>
          </div>

          {/* Macros bar */}
          <div className="grid grid-cols-3 gap-2 p-3 bg-emerald-50/70 rounded-2xl border border-emerald-100">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-emerald-800 text-xs font-semibold">
                <Flame className="w-3.5 h-3.5" />
                <span>{item.calories}</span>
              </div>
              <p className="text-[11px] text-emerald-700/80 mt-0.5">Calories</p>
            </div>
            <div className="text-center border-x border-emerald-200/60">
              <div className="flex items-center justify-center gap-1 text-emerald-800 text-xs font-semibold">
                <Dumbbell className="w-3.5 h-3.5" />
                <span>{item.protein}</span>
              </div>
              <p className="text-[11px] text-emerald-700/80 mt-0.5">Protein</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-emerald-800 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{item.carbs}</span>
              </div>
              <p className="text-[11px] text-emerald-700/80 mt-0.5">Carbs</p>
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-2">Ingredients & Quality</h3>
            <div className="flex flex-wrap gap-1.5">
              {item.ingredients.map((ing, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded-lg font-medium"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Kitchen assurance */}
          <div className="flex items-start gap-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              Prepared in your community central kitchen with cold-pressed oils, rock salt, and zero artificial preservatives.
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-100 bg-white flex items-center gap-3">
          <button
            onClick={() => {
              addToCart(item);
              onClose();
            }}
            className="flex-1 h-12 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add to Cart · ₹{item.price}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
