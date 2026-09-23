import React from 'react';
import {
  Home,
  UtensilsCrossed,
  Sparkles,
  ShoppingBag,
  User,
  Smartphone,
  Maximize2,
  ChevronLeft,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppScreen } from '../../types';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const {
    currentScreen,
    navigateTo,
    cart,
    isPhoneFrame,
    togglePhoneFrame,
    user,
  } = useApp();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Hide nav bar and top bar on splash & login screens
  const isAuthOrSplash = currentScreen === 'splash' || currentScreen === 'login';

  const navTabs: { id: AppScreen; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'menu', label: 'Menu', icon: UtensilsCrossed },
    { id: 'planner', label: 'AI Planner', icon: Sparkles },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-start sm:py-4 transition-all">
      {/* Top Frame Control Bar on desktop */}
      <div className="w-full max-w-md px-4 py-2 flex items-center justify-between text-xs text-slate-500 mb-1 hidden sm:flex">
        <div className="flex items-center gap-1.5 font-medium text-emerald-800">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>NutriNest · {user?.community.split(' ')[0] || 'Community'}</span>
        </div>
        <button
          onClick={togglePhoneFrame}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium cursor-pointer shadow-xs transition-colors"
          title="Toggle phone device simulation"
        >
          {isPhoneFrame ? (
            <>
              <Maximize2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Full Width</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5 text-slate-500" />
              <span>Phone Frame</span>
            </>
          )}
        </button>
      </div>

      {/* Main Container / Mobile Canvas */}
      <div
        className={`w-full bg-white flex flex-col relative transition-all overflow-hidden ${
          isPhoneFrame
            ? 'max-w-[400px] min-h-[844px] rounded-[40px] shadow-2xl border-[8px] border-slate-900 my-auto'
            : 'max-w-md min-h-screen sm:min-h-[860px] sm:rounded-3xl sm:shadow-xl sm:border sm:border-slate-200'
        }`}
      >
        {/* Mobile Status Bar (Visible in phone frame or mobile view) */}
        {!isAuthOrSplash && (
          <div className="h-10 px-6 pt-2 pb-1 bg-white/95 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between text-xs text-slate-800 font-semibold select-none border-b border-slate-100">
            <span>9:41</span>
            <div className="w-20 h-4 bg-slate-900 rounded-full mx-auto hidden sm:block opacity-90" />
            <div className="flex items-center gap-1.5 text-[11px] font-mono">
              <span>5G</span>
              <span className="w-4 h-2.5 border border-slate-800 rounded-xs flex items-center p-0.5">
                <span className="w-full h-full bg-emerald-600 rounded-2xs" />
              </span>
            </div>
          </div>
        )}

        {/* Dynamic Mobile Top App Bar (When not on splash/login) */}
        {!isAuthOrSplash && (
          <header className="px-4 py-2.5 bg-white border-b border-slate-100 sticky top-10 z-30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {currentScreen !== 'home' ? (
                <button
                  onClick={() => navigateTo('home')}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
                  aria-label="Back to home"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              ) : (
                <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shadow-xs font-display">
                  N
                </div>
              )}
              <div>
                <h1 className="text-base font-bold text-slate-900 leading-tight font-display capitalize">
                  {currentScreen === 'home'
                    ? 'NutriNest'
                    : currentScreen === 'group-orders'
                    ? 'Group Orders'
                    : currentScreen === 'food-waste'
                    ? 'Waste Reduction'
                    : currentScreen === 'challenges'
                    ? 'Health Challenge'
                    : currentScreen}
                </h1>
                <p className="text-[11px] text-emerald-800 font-medium truncate max-w-[190px]">
                  {user?.flatNumber || 'Greenfield Heights'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => navigateTo('cart')}
                className="relative w-10 h-10 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5 text-slate-700" />
                {totalCartCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white tabular-nums">
                    {totalCartCount}
                  </span>
                )}
              </button>
            </div>
          </header>
        )}

        {/* Screen Content Container */}
        <main className="flex-1 flex flex-col bg-slate-50/50 pb-20 overflow-y-auto">
          {children}
        </main>

        {/* Fixed Mobile Bottom Tab Bar */}
        {!isAuthOrSplash && (
          <nav 
            className="fixed sm:sticky bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1.5 flex items-center justify-around"
            role="navigation"
            aria-label="Bottom Navigation"
          >
            {navTabs.map(tab => {
              const Icon = tab.icon;
              const isActive = currentScreen === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => navigateTo(tab.id)}
                  className={`min-h-[46px] min-w-[56px] flex flex-col items-center justify-center gap-1 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'text-emerald-700 font-semibold'
                      : 'text-slate-500 hover:text-slate-900 font-medium'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <div
                    className={`p-1 rounded-full transition-transform ${
                      isActive ? 'bg-emerald-50 scale-110' : ''
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-700 stroke-[2.4]' : 'text-slate-500'}`} />
                  </div>
                  <span className="text-[10px] tracking-tight">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        )}
      </div>
    </div>
  );
};
