import React, { useState } from 'react';
import {
  User,
  Building,
  Heart,
  AlertTriangle,
  ShoppingBag,
  Settings,
  LogOut,
  Sparkles,
  Database,
  Plus,
  X,
  Phone,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProfileScreen: React.FC = () => {
  const { user, updateUserProfile, logout, orders } = useApp();
  const [newPreference, setNewPreference] = useState('');
  const [newAllergy, setNewAllergy] = useState('');
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  if (!user) return null;

  const handleAddPreference = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPreference.trim()) return;
    if (!user.foodPreferences.includes(newPreference.trim())) {
      updateUserProfile({
        foodPreferences: [...user.foodPreferences, newPreference.trim()],
      });
    }
    setNewPreference('');
  };

  const handleRemovePreference = (pref: string) => {
    updateUserProfile({
      foodPreferences: user.foodPreferences.filter(p => p !== pref),
    });
  };

  const handleAddAllergy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAllergy.trim()) return;
    if (!user.allergies.includes(newAllergy.trim())) {
      updateUserProfile({
        allergies: [...user.allergies, newAllergy.trim()],
      });
    }
    setNewAllergy('');
  };

  const handleRemoveAllergy = (allergy: string) => {
    updateUserProfile({
      allergies: user.allergies.filter(a => a !== allergy),
    });
  };

  return (
    <div className="p-4 space-y-4">
      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold text-xl shadow-md font-display">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-bold text-slate-900 font-display truncate">
              {user.name}
            </h2>
            <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate">{user.community}</span>
            </div>
            <div className="text-[11px] font-semibold text-emerald-800 font-mono">
              {user.flatNumber}
            </div>
          </div>
        </div>

        {/* Quick Resident Stats */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-center">
          <div className="p-2 bg-slate-50 rounded-xl">
            <div className="text-sm font-bold text-slate-900 font-mono">
              {orders.length}
            </div>
            <div className="text-[10px] text-slate-500">Orders Placed</div>
          </div>
          <div className="p-2 bg-emerald-50 rounded-xl">
            <div className="text-sm font-bold text-emerald-800 font-mono">
              {user.ecoPoints}
            </div>
            <div className="text-[10px] text-emerald-700">Eco Points</div>
          </div>
          <div className="p-2 bg-teal-50 rounded-xl">
            <div className="text-sm font-bold text-teal-800 font-mono">
              {user.wellnessScore}
            </div>
            <div className="text-[10px] text-teal-700">Wellness Score</div>
          </div>
        </div>
      </div>

      {/* Food Preferences & Diet Card (Requested) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-emerald-600" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Food Preferences
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">Dietary profile</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {user.foodPreferences.map(pref => (
            <span
              key={pref}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium"
            >
              <span>{pref}</span>
              <button
                type="button"
                onClick={() => handleRemovePreference(pref)}
                className="hover:text-red-500 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        {/* Add Preference Input */}
        <form onSubmit={handleAddPreference} className="flex gap-2 pt-1">
          <input
            type="text"
            value={newPreference}
            onChange={e => setNewPreference(e.target.value)}
            placeholder="Add preference (e.g. Jain, Low Oil)"
            className="flex-1 h-9 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            className="px-3 h-9 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </form>
      </div>

      {/* Allergies Card (Requested) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Food Allergies
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">Notified to kitchen</span>
        </div>

        <p className="text-[11px] text-slate-500 leading-relaxed">
          Community chefs automatically flag dishes containing these ingredients when you order.
        </p>

        <div className="flex flex-wrap gap-1.5">
          {user.allergies.map(allergy => (
            <span
              key={allergy}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium"
            >
              <span>{allergy}</span>
              <button
                type="button"
                onClick={() => handleRemoveAllergy(allergy)}
                className="hover:text-red-500 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>

        {/* Add Allergy Input */}
        <form onSubmit={handleAddAllergy} className="flex gap-2 pt-1">
          <input
            type="text"
            value={newAllergy}
            onChange={e => setNewAllergy(e.target.value)}
            placeholder="Add allergy (e.g. Gluten, Dairy)"
            className="flex-1 h-9 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            className="px-3 h-9 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-900 flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </form>
      </div>

      {/* Firebase Readiness Info */}
      <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <Database className="w-4 h-4 text-emerald-600" />
            <span>Database Architecture</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
            Firebase Ready
          </span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Running prototype on local state with full Flutter/Dart & Firebase Firestore schema compatibility (Orders, Menu, Group Orders, and Waste Logs).
        </p>
      </div>

      {/* Settings & Logout Actions (Requested) */}
      <div className="space-y-2">
        <button
          onClick={() => setShowSettingsModal(true)}
          className="w-full h-11 px-4 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer shadow-xs"
        >
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-slate-500" />
            <span>App Settings & Notifications</span>
          </div>
          <span className="text-[11px] text-slate-400">Configure</span>
        </button>

        <button
          onClick={logout}
          className="w-full h-11 px-4 rounded-xl bg-white border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout from NutriNest</span>
        </button>
      </div>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Settings & Preferences
              </h3>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs p-1"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <span>Kitchen Meal Time Reminders</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <span>Group Order Alerts</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <span>Zero-Waste Prompt After Meals</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <span>Stainless Steel Tiffin Preference</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600" />
              </div>
            </div>

            <button
              onClick={() => setShowSettingsModal(false)}
              className="w-full h-10 bg-emerald-700 text-white rounded-xl font-bold text-xs hover:bg-emerald-800 transition-colors"
            >
              Save Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
