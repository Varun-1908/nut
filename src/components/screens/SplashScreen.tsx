import React from 'react';
import { Leaf, ArrowRight, ShieldCheck, Users, HeartHandshake } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SplashScreen: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="min-h-[700px] flex-1 flex flex-col items-center justify-between p-6 bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-950 text-white relative overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-teal-400/20 blur-3xl pointer-events-none" />

      {/* Top Tagline pill */}
      <div className="pt-8 flex items-center justify-center">
        <span className="px-3.5 py-1.5 rounded-full bg-emerald-700/60 border border-emerald-500/30 text-[11px] font-semibold tracking-wide text-emerald-200 uppercase">
          Gated Community Catering
        </span>
      </div>

      {/* Center Branding & Logo */}
      <div className="flex flex-col items-center text-center space-y-4 my-auto">
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-2xl shadow-emerald-500/40 p-4 border-2 border-emerald-300/40">
            <Leaf className="w-12 h-12 text-white" />
          </div>
          <span className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-white text-emerald-800 flex items-center justify-center font-bold text-xs shadow-md">
            🌱
          </span>
        </div>

        <div>
          <h1 className="text-4xl font-bold font-display tracking-tight text-white">
            NutriNest
          </h1>
          <p className="text-sm font-medium text-emerald-200/90 mt-1">
            Smart Food. Healthy Community.
          </p>
        </div>

        <p className="text-xs text-emerald-100/70 max-w-xs leading-relaxed">
          "Smart Food. Healthy People. Better Community."
        </p>

        {/* Feature highlight bullets */}
        <div className="grid grid-cols-3 gap-3 pt-6 w-full max-w-xs text-center">
          <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10">
            <ShieldCheck className="w-5 h-5 text-emerald-300 mx-auto mb-1" />
            <span className="text-[10px] font-medium text-emerald-100">Clean Food</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10">
            <Users className="w-5 h-5 text-teal-300 mx-auto mb-1" />
            <span className="text-[10px] font-medium text-emerald-100">Group Orders</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10">
            <HeartHandshake className="w-5 h-5 text-emerald-300 mx-auto mb-1" />
            <span className="text-[10px] font-medium text-emerald-100">Zero Waste</span>
          </div>
        </div>
      </div>

      {/* Bottom CTA Buttons */}
      <div className="w-full space-y-3 pb-6 max-w-xs">
        <button
          onClick={() => navigateTo('home')}
          className="w-full h-12 rounded-2xl bg-white text-emerald-900 font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-black/20 hover:bg-emerald-50 active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => navigateTo('login')}
          className="w-full h-11 rounded-2xl bg-emerald-800/80 border border-emerald-600/50 text-emerald-100 font-medium text-xs flex items-center justify-center hover:bg-emerald-800 transition-colors cursor-pointer"
        >
          <span>Resident Login / Select Society</span>
        </button>
      </div>
    </div>
  );
};
