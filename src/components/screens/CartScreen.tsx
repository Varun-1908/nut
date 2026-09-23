import React, { useState } from 'react';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Building,
  UtensilsCrossed,
  Leaf,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CartScreen: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, placeOrder, navigateTo, user } = useApp();
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [needEcoCutlery, setNeedEcoCutlery] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.foodItem.price * item.quantity, 0);
  const communitySubsidy = subtotal >= 200 ? 25 : 0;
  const packagingFee = 0; // Community zero-waste reusable stainless tiffin/glass container
  const finalTotal = Math.max(0, subtotal - communitySubsidy + packagingFee);

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    const noteText = `${deliveryNotes}${needEcoCutlery ? ' · Include eco-bamboo cutlery' : ' · No disposable cutlery requested (using home cutlery)'}`;
    placeOrder(noteText);
    navigateTo('orders');
  };

  if (cart.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center min-h-[500px]">
        <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
          <UtensilsCrossed className="w-8 h-8" />
        </div>
        <h3 className="text-base font-bold text-slate-900 font-display">Your Cart is Empty</h3>
        <p className="text-xs text-slate-500 max-w-xs mt-1 mb-6">
          Check out today's fresh wholesome dishes from your community kitchen.
        </p>
        <button
          onClick={() => navigateTo('menu')}
          className="px-6 py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors shadow-xs cursor-pointer"
        >
          Explore Food Menu
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Delivery Destination banner */}
      <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
            <Building className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 leading-tight">
              Delivering to {user?.flatNumber || 'Tower B · Flat 402'}
            </div>
            <div className="text-[11px] text-slate-500 truncate max-w-[200px]">
              {user?.community || 'Greenfield Heights Residency'}
            </div>
          </div>
        </div>
        <span className="text-[11px] font-semibold text-emerald-700 font-mono">15-20 min</span>
      </div>

      {/* Cart Items List */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Selected Food ({cart.reduce((s, i) => s + i.quantity, 0)} items)
        </h3>

        <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-xs overflow-hidden">
          {cart.map(item => (
            <div key={item.foodItem.id} className="p-3.5 flex items-center gap-3">
              <img
                src={item.foodItem.image}
                alt={item.foodItem.name}
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-xl object-cover bg-emerald-50 shrink-0"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-1">
                  <h4 className="text-xs font-bold text-slate-900 truncate font-display">
                    {item.foodItem.name}
                  </h4>
                  <button
                    onClick={() => removeFromCart(item.foodItem.id)}
                    className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="text-[11px] text-emerald-800 font-bold font-mono">
                  ₹{item.foodItem.price} × {item.quantity} = ₹{item.foodItem.price * item.quantity}
                </div>
                <div className="text-[10px] text-slate-400">
                  {item.foodItem.calories} kcal · {item.foodItem.protein} protein
                </div>
              </div>

              {/* Quantity selector */}
              <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => updateCartQuantity(item.foodItem.id, -1)}
                  className="w-6 h-6 rounded-md bg-white text-slate-700 flex items-center justify-center hover:bg-slate-50 cursor-pointer shadow-2xs"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-xs font-bold text-slate-900 font-mono px-1">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateCartQuantity(item.foodItem.id, 1)}
                  className="w-6 h-6 rounded-md bg-emerald-700 text-white flex items-center justify-center hover:bg-emerald-800 cursor-pointer shadow-2xs"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sustainable Packaging & Cutlery Options */}
      <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-slate-900">Zero-Waste Community Tiffin</span>
          </div>
          <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
            Free · Reusable
          </span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Delivered in sanitized stainless steel or ceramic hot-boxes. Picked up next morning or returned to lobby drop box.
        </p>

        <label className="flex items-center gap-2 pt-1 text-xs text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={needEcoCutlery}
            onChange={e => setNeedEcoCutlery(e.target.checked)}
            className="w-4 h-4 text-emerald-600 rounded-xs border-slate-300 focus:ring-emerald-500"
          />
          <span>Request disposable eco-cutlery (Opt out to reduce plastic!)</span>
        </label>
      </div>

      {/* Special Kitchen Notes */}
      <div className="space-y-1">
        <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
          Delivery Notes / Dietary Instruction
        </label>
        <input
          type="text"
          value={deliveryNotes}
          onChange={e => setDeliveryNotes(e.target.value)}
          placeholder="e.g. Leave with security guard, extra hot sambar..."
          className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      {/* Bill Breakdown */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
          Bill Details
        </h4>
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span>Items Subtotal</span>
          <span className="font-mono font-medium">₹{subtotal}</span>
        </div>
        {communitySubsidy > 0 && (
          <div className="flex items-center justify-between text-xs text-emerald-700 font-medium">
            <span>Resident Society Subsidy (Order &gt; ₹200)</span>
            <span className="font-mono">-₹{communitySubsidy}</span>
          </div>
        )}
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span>Community Doorstep Delivery</span>
          <span className="text-emerald-700 font-semibold">FREE</span>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span>Reusable Tiffin Deposit</span>
          <span className="text-emerald-700 font-semibold">₹0 (Waived)</span>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-900">Total Payable</div>
            <div className="text-[10px] text-slate-400">Includes all kitchen taxes</div>
          </div>
          <span className="text-xl font-bold text-emerald-800 font-mono">₹{finalTotal}</span>
        </div>
      </div>

      {/* Trust reassurance */}
      <div className="flex items-center gap-2 text-[11px] text-slate-500 px-1">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Pay on doorstep via UPI or auto-charged to society maintenance account.</span>
      </div>

      {/* Place Order CTA */}
      <button
        onClick={handlePlaceOrder}
        className="w-full h-12 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 active:scale-[0.98] transition-all cursor-pointer"
      >
        <span>Place Order · ₹{finalTotal}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
