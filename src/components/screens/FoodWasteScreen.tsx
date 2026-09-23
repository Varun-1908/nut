import React, { useState } from 'react';
import {
  Recycle,
  Sparkles,
  PieChart,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Send,
  Leaf,
  TrendingDown,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WasteFeedbackLevel } from '../../types';

export const FoodWasteScreen: React.FC = () => {
  const { wasteSubmissions, submitWasteFeedback, foodItems } = useApp();

  const [selectedMeal, setSelectedMeal] = useState<string>(foodItems[0].name);
  const [selectedLevel, setSelectedLevel] = useState<WasteFeedbackLevel>('Finished');
  const [residentNote, setResidentNote] = useState<string>('');

  const wasteOptions: { level: WasteFeedbackLevel; label: string; icon: string; desc: string; color: string }[] = [
    {
      level: 'Finished',
      label: 'Finished Clean',
      icon: '🍽️',
      desc: '100% finished, perfect portion size (+30 pts)',
      color: 'border-emerald-500 bg-emerald-50 text-emerald-900',
    },
    {
      level: 'Small amount left',
      label: 'Small amount left',
      icon: '🥄',
      desc: '~10-15% left over (+20 pts)',
      color: 'border-teal-500 bg-teal-50 text-teal-900',
    },
    {
      level: 'Half left',
      label: 'Half left',
      icon: '🥣',
      desc: '~50% left, portion was too large (+10 pts)',
      color: 'border-amber-500 bg-amber-50 text-amber-900',
    },
    {
      level: 'Most left',
      label: 'Most left',
      icon: '📦',
      desc: '&gt;70% left, taste or quantity issue (+5 pts)',
      color: 'border-rose-500 bg-rose-50 text-rose-900',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitWasteFeedback(selectedMeal, selectedLevel, residentNote);
    setResidentNote('');
  };

  // Community aggregate statistics calculation
  const totalSubmissions = wasteSubmissions.length;
  const finishedCount = wasteSubmissions.filter(w => w.level === 'Finished').length;
  const communityCleanPlateRate = totalSubmissions > 0
    ? Math.round((finishedCount / totalSubmissions) * 100)
    : 92;

  return (
    <div className="p-4 space-y-4">
      {/* Community Food-Waste Summary Widget */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <Recycle className="w-4 h-4 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-sm font-bold font-display uppercase tracking-wider">
                Community Food-Waste Tracker
              </h2>
              <p className="text-[11px] text-emerald-200">
                Greenfield Heights Central Kitchen
              </p>
            </div>
          </div>
          <span className="text-xl">♻️</span>
        </div>

        {/* Big percentage highlight */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="p-3 bg-white/10 rounded-xl border border-white/10">
            <div className="text-3xl font-bold font-mono text-white">
              {communityCleanPlateRate}%
            </div>
            <p className="text-[10px] text-emerald-200 mt-0.5">Clean Plate Rate (Zero Waste)</p>
          </div>

          <div className="p-3 bg-white/10 rounded-xl border border-white/10">
            <div className="text-3xl font-bold font-mono text-emerald-300">
              8.6%
            </div>
            <p className="text-[10px] text-emerald-200 mt-0.5">Average Community Waste Rate</p>
          </div>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-emerald-100">
          <span className="flex items-center gap-1">
            <Leaf className="w-3.5 h-3.5 text-emerald-300" />
            <span>48kg organic compost generated this week</span>
          </span>
          <span className="font-mono font-semibold text-emerald-200">92% Lower than city avg</span>
        </div>
      </div>

      {/* Post-Meal Waste Form (Requested 4 levels) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3">
        <div>
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Report Your Meal Waste
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Help the kitchen optimize batch sizes and ingredients according to resident appetite.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Meal selector */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Select Meal / Dish
            </label>
            <select
              value={selectedMeal}
              onChange={e => setSelectedMeal(e.target.value)}
              className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-500"
            >
              {foodItems.map(item => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* 4 Feedback Levels requested */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-700">
              How much was left on your plate?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {wasteOptions.map(opt => {
                const isSelected = selectedLevel === opt.level;
                return (
                  <button
                    key={opt.level}
                    type="button"
                    onClick={() => setSelectedLevel(opt.level)}
                    className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                      isSelected
                        ? `${opt.color} ring-2 ring-emerald-600/30 shadow-xs font-semibold`
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-lg">{opt.icon}</span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold">{opt.label}</div>
                      <div className="text-[10px] opacity-80 leading-tight mt-0.5" dangerouslySetInnerHTML={{ __html: opt.desc }} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional notes */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Kitchen Feedback / Portion Preference (Optional)
            </label>
            <input
              type="text"
              value={residentNote}
              onChange={e => setResidentNote(e.target.value)}
              placeholder="e.g. Sambar was delicious, could do with 1 idli less next time"
              className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            className="w-full h-11 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98] transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Feedback & Earn Eco Points</span>
          </button>
        </form>
      </div>

      {/* Recent Feedback Submissions */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Your Recent Waste Logs
        </h3>

        <div className="space-y-2">
          {wasteSubmissions.map(sub => (
            <div
              key={sub.id}
              className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs flex items-start justify-between"
            >
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-slate-900">{sub.mealName}</div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <span className="font-semibold text-emerald-700">{sub.level}</span>
                  <span>·</span>
                  <span>{sub.timestamp}</span>
                </div>
                {sub.residentNote && (
                  <p className="text-[10px] text-slate-400 italic">"{sub.residentNote}"</p>
                )}
              </div>
              <span className="text-[11px] font-bold text-emerald-800 font-mono px-2 py-0.5 rounded bg-emerald-50">
                +{sub.ecoPointsAwarded} pts
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
