import React, { useState } from 'react';
import { Leaf, Lock, Mail, Building2, Home, ArrowRight, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LoginScreen: React.FC = () => {
  const { login, navigateTo } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('ananya.d@greenfield.in');
  const [password, setPassword] = useState('password123');
  const [flatNumber, setFlatNumber] = useState('Tower B · Flat 402');
  const [community, setCommunity] = useState('Greenfield Heights Residency');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, flatNumber, community);
  };

  const handleQuickDemo = () => {
    setEmail('resident@greenfield.in');
    setFlatNumber('Tower A · Flat 104');
    login('resident@greenfield.in', 'Tower A · Flat 104', 'Greenfield Heights Residency');
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-slate-50 min-h-[700px]">
      <div className="space-y-6 pt-6">
        {/* Brand header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-md shadow-emerald-700/20">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 font-display">NutriNest</h1>
            <p className="text-xs text-emerald-700 font-medium">Smart Food. Healthy Community.</p>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex p-1 bg-slate-200/80 rounded-xl">
          <button
            type="button"
            onClick={() => setIsRegister(false)}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              !isRegister ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Resident Login
          </button>
          <button
            type="button"
            onClick={() => setIsRegister(true)}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              isRegister ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Register Flat
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Society / Community</label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                value={community}
                onChange={e => setCommunity(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="Greenfield Heights Residency">Greenfield Heights Residency</option>
                <option value="Emerald Palm Enclave">Emerald Palm Enclave</option>
                <option value="Prestige Silver Springs">Prestige Silver Springs</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Apartment / Flat Number</label>
            <div className="relative">
              <Home className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={flatNumber}
                onChange={e => setFlatNumber(e.target.value)}
                placeholder="e.g. Tower B · Flat 402"
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Resident Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@society.in"
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 active:scale-[0.98] transition-all cursor-pointer mt-2"
          >
            <span>{isRegister ? 'Register & Enter Community' : 'Login to NutriNest'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Fast Login */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleQuickDemo}
            className="w-full py-2.5 px-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Instant Demo Resident Login (Flat 104)</span>
          </button>
        </div>
      </div>

      <div className="text-center pt-6 pb-2 text-[11px] text-slate-400">
        <span>Protected Community Central Kitchen · 100% Organic & FSSAI Compliant</span>
      </div>
    </div>
  );
};
