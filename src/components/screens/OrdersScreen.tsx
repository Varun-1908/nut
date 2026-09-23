import React from 'react';
import {
  Clock,
  CheckCircle2,
  ChefHat,
  Bike,
  PackageCheck,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Recycle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OrderStatus, Order } from '../../types';

export const OrdersScreen: React.FC = () => {
  const { orders, advanceOrderStatus, navigateTo } = useApp();

  const activeOrders = orders.filter(o => o.status !== 'Delivered');
  const pastOrders = orders.filter(o => o.status === 'Delivered');

  const statusSteps: { id: OrderStatus; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'Placed', label: 'Placed', icon: Clock },
    { id: 'Confirmed', label: 'Confirmed', icon: CheckCircle2 },
    { id: 'Preparing', label: 'Preparing', icon: ChefHat },
    { id: 'Ready', label: 'Ready', icon: PackageCheck },
    { id: 'Delivered', label: 'Delivered', icon: Bike },
  ];

  const getStepIndex = (status: OrderStatus) => {
    return statusSteps.findIndex(s => s.id === status);
  };

  return (
    <div className="p-4 space-y-5">
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 font-display">Your Community Orders</h2>
          <p className="text-xs text-slate-500">Live kitchen tracking & order history</p>
        </div>
        <button
          onClick={() => navigateTo('menu')}
          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
        >
          <span>Order More</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Current Active Orders */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Active Orders ({activeOrders.length})
          </h3>
          {activeOrders.length > 0 && (
            <span className="text-[11px] text-emerald-700 font-medium">Live status updating</span>
          )}
        </div>

        {activeOrders.length === 0 ? (
          <div className="p-6 bg-white rounded-2xl border border-slate-200 text-center space-y-2">
            <PackageCheck className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs font-semibold text-slate-700">No active orders right now</p>
            <p className="text-[11px] text-slate-400">Order wholesome meals prepared by community chefs</p>
            <button
              onClick={() => navigateTo('menu')}
              className="mt-2 px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 cursor-pointer inline-flex items-center gap-1"
            >
              <span>Explore Today's Menu</span>
            </button>
          </div>
        ) : (
          activeOrders.map(order => {
            const currentStepIdx = getStepIndex(order.status);
            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border-2 border-emerald-500/80 p-4 space-y-4 shadow-sm"
              >
                {/* Order Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 font-mono">
                        {order.id}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {order.createdAt} · ETA: {order.estimatedDeliveryTime}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-emerald-800 font-mono">
                      ₹{order.finalAmount}
                    </span>
                    <p className="text-[10px] text-slate-400">{order.deliveryFlat}</p>
                  </div>
                </div>

                {/* 5-Step Status Tracker: Placed → Confirmed → Preparing → Ready → Delivered */}
                <div className="py-2">
                  <div className="flex items-center justify-between relative">
                    {/* Connecting background line */}
                    <div className="absolute top-3.5 left-4 right-4 h-0.5 bg-slate-200 -z-0" />
                    <div
                      className="absolute top-3.5 left-4 h-0.5 bg-emerald-600 -z-0 transition-all duration-300"
                      style={{
                        width: `${(currentStepIdx / (statusSteps.length - 1)) * 88}%`,
                      }}
                    />

                    {statusSteps.map((step, idx) => {
                      const Icon = step.icon;
                      const isPastOrCurrent = idx <= currentStepIdx;
                      const isCurrent = idx === currentStepIdx;

                      return (
                        <div key={step.id} className="flex flex-col items-center z-10">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                              isCurrent
                                ? 'bg-emerald-700 text-white ring-4 ring-emerald-100 shadow-xs'
                                : isPastOrCurrent
                                ? 'bg-emerald-600 text-white'
                                : 'bg-white border-2 border-slate-300 text-slate-400'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span
                            className={`text-[9px] mt-1.5 font-medium whitespace-nowrap ${
                              isCurrent
                                ? 'text-emerald-800 font-bold'
                                : isPastOrCurrent
                                ? 'text-slate-800'
                                : 'text-slate-400'
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Items Summary */}
                <div className="bg-slate-50 rounded-xl p-2.5 space-y-1 text-xs text-slate-700">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[11px]">
                      <span>
                        {item.foodItem.name} <strong className="font-mono">×{item.quantity}</strong>
                      </span>
                      <span className="font-mono font-medium">
                        ₹{item.foodItem.price * item.quantity}
                      </span>
                    </div>
                  ))}
                  {order.notes && (
                    <p className="text-[10px] text-slate-500 pt-1 border-t border-slate-200/80">
                      Note: {order.notes}
                    </p>
                  )}
                </div>

                {/* Advance Order Status Button (to test the 5-step flow interactively) */}
                <div className="pt-1 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    <span>Simulate kitchen progress:</span>
                  </div>
                  <button
                    onClick={() => advanceOrderStatus(order.id)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Advance Status</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Previous / Past Orders */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Previous Orders ({pastOrders.length})
        </h3>

        {pastOrders.map(order => (
          <div
            key={order.id}
            className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 font-mono">{order.id}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                    Delivered
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{order.createdAt}</p>
              </div>
              <span className="text-xs font-bold text-slate-900 font-mono">
                ₹{order.finalAmount}
              </span>
            </div>

            <div className="text-xs text-slate-600 divide-y divide-slate-100">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-1 flex justify-between">
                  <span>
                    {item.foodItem.name} × {item.quantity}
                  </span>
                  <span className="font-mono">₹{item.foodItem.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Zero Waste Feedback Trigger */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">How was your portion size?</span>
              <button
                onClick={() => navigateTo('food-waste')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-semibold hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                <Recycle className="w-3.5 h-3.5" />
                <span>Log Waste Feedback</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
