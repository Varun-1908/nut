import React, { useState } from 'react';
import {
  Users,
  Clock,
  Tag,
  Plus,
  CheckCircle2,
  TrendingDown,
  Sparkles,
  Building,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GroupOrderScreen: React.FC = () => {
  const { groupOrders, joinGroupOrder, createGroupOrder, user } = useApp();
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New campaign state
  const [newTitle, setNewTitle] = useState('');
  const [newMealName, setNewMealName] = useState('');
  const [newSlot, setNewSlot] = useState('');
  const [newRegularPrice, setNewRegularPrice] = useState(160);
  const [newDiscountedPrice, setNewDiscountedPrice] = useState(120);

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newMealName) return;

    createGroupOrder({
      title: newTitle,
      mealName: newMealName,
      description: `Community pooled batch delivery to ${user?.community || 'Society'}. Freshly prepped together.`,
      deliverySlot: newSlot || 'Tomorrow, 1:00 PM',
      regularPrice: Number(newRegularPrice),
      discountedPrice: Number(newDiscountedPrice),
      targetCount: 6,
      expiresInMinutes: 120,
      image: groupOrders[0]?.image || '',
    });

    setShowCreateModal(false);
    setNewTitle('');
    setNewMealName('');
  };

  return (
    <div className="p-4 space-y-4">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-emerald-800 to-emerald-900 text-white rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-200 text-xs font-semibold">
              <Users className="w-4 h-4" />
              <span>Community Group Dining</span>
            </div>
            <h2 className="text-base font-bold font-display">Bulk Cooking · Lower Cost</h2>
            <p className="text-xs text-emerald-100/80 leading-relaxed max-w-xs">
              When 5+ apartments order the same wholesome dish, kitchen prep efficiency saves up to 25% for everyone!
            </p>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
          <div className="text-[11px] text-emerald-200">
            Current Community Pool: <strong className="text-white font-mono">14 Flats Joined</strong>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-3 py-1.5 rounded-xl bg-white text-emerald-900 font-bold text-xs hover:bg-emerald-50 active:scale-95 transition-all cursor-pointer flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Host Order</span>
          </button>
        </div>
      </div>

      {/* Active Group Campaigns */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Active Community Group Orders
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">
            {groupOrders.length} live
          </span>
        </div>

        {groupOrders.map(campaign => {
          const discountPercent = Math.round(
            ((campaign.regularPrice - campaign.discountedPrice) / campaign.regularPrice) * 100
          );
          const progressPercent = Math.min(100, Math.round((campaign.currentCount / campaign.targetCount) * 100));

          return (
            <div
              key={campaign.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-sm transition-all"
            >
              {/* Card Image Banner */}
              <div className="relative h-36 w-full bg-emerald-50">
                <img
                  src={campaign.image}
                  alt={campaign.mealName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-white/95 text-xs font-bold text-emerald-800 shadow-xs flex items-center gap-1">
                  <Tag className="w-3 h-3 text-emerald-600" />
                  <span>{discountPercent}% Group Discount</span>
                </div>
                <div className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-400" />
                  <span>Delivery: {campaign.deliverySlot}</span>
                </div>
              </div>

              <div className="p-4 space-y-3.5">
                {/* Titles */}
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 font-display">
                        {campaign.title}
                      </h4>
                      <p className="text-xs font-medium text-emerald-800 mt-0.5">
                        {campaign.mealName}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-bold text-emerald-800 font-mono">
                        ₹{campaign.discountedPrice}
                      </div>
                      <div className="text-[11px] text-slate-400 line-through font-mono">
                        ₹{campaign.regularPrice}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {campaign.description}
                  </p>
                </div>

                {/* Progress toward group discount threshold */}
                <div className="space-y-1.5 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-500" />
                      <span>{campaign.currentCount} portions ordered</span>
                    </span>
                    <span className="font-mono text-emerald-800 font-bold">
                      Goal: {campaign.targetCount} portions
                    </span>
                  </div>

                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  {campaign.currentCount >= campaign.targetCount ? (
                    <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold pt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Bulk discount locked in for everyone!</span>
                    </div>
                  ) : (
                    <div className="text-[11px] text-slate-500">
                      Only {campaign.targetCount - campaign.currentCount} more needed to activate group discount!
                    </div>
                  )}
                </div>

                {/* Joined Residents / Flats */}
                <div>
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Building className="w-3 h-3 text-slate-400" />
                    <span>Flats in this batch ({campaign.joinedFlats.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {campaign.joinedFlats.map((j, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50/80 border border-emerald-200/60 text-xs"
                      >
                        <span className="w-4 h-4 rounded-full bg-emerald-700 text-white text-[10px] font-bold flex items-center justify-center">
                          {j.avatarLetter}
                        </span>
                        <span className="font-semibold text-slate-800">{j.flat}</span>
                        <span className="text-slate-400 text-[10px]">({j.portionCount}x)</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Join CTA */}
                <div className="pt-1">
                  {campaign.isJoinedByCurrentUser ? (
                    <div className="w-full py-2.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>Your Flat has Joined this Order</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => joinGroupOrder(campaign.id)}
                      className="w-full h-11 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <Users className="w-4 h-4" />
                      <span>Join Order · ₹{campaign.discountedPrice} (Save ₹{campaign.regularPrice - campaign.discountedPrice})</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Host New Order Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Host a Community Group Order
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs p-1"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleCreateGroup} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Event / Order Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. Saturday Millet Feast"
                  className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Meal Name & Specialty
                </label>
                <input
                  type="text"
                  required
                  value={newMealName}
                  onChange={e => setNewMealName(e.target.value)}
                  placeholder="e.g. Organic Ragi Idli & Medu Vada Combo"
                  className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Regular Price (₹)
                  </label>
                  <input
                    type="number"
                    value={newRegularPrice}
                    onChange={e => setNewRegularPrice(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Group Price (₹)
                  </label>
                  <input
                    type="number"
                    value={newDiscountedPrice}
                    onChange={e => setNewDiscountedPrice(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Delivery Slot
                </label>
                <input
                  type="text"
                  value={newSlot}
                  onChange={e => setNewSlot(e.target.value)}
                  placeholder="e.g. Saturday, 1:30 PM"
                  className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800"
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1 shadow-xs active:scale-[0.98] transition-all cursor-pointer mt-2"
              >
                <span>Publish to Community</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
