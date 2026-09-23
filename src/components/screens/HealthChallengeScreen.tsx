import React from 'react';
import {
  Trophy,
  Award,
  Flame,
  CheckCircle2,
  Plus,
  Footprints,
  Droplets,
  Sun,
  Sparkles,
  Medal,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HealthChallengeScreen: React.FC = () => {
  const { challenges, updateChallengeProgress, leaderboard, user } = useApp();

  const getChallengeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun':
        return Sun;
      case 'Footprints':
        return Footprints;
      case 'Droplets':
        return Droplets;
      default:
        return Sparkles;
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl p-4 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-200 text-xs font-semibold">
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>Community Wellness League</span>
            </div>
            <h2 className="text-base font-bold font-display">Resident Health Challenges</h2>
            <p className="text-xs text-emerald-100/80">
              Eat wholesome, stay active, and climb the Greenfield Heights community leaderboard!
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
          <div className="text-xs">
            Your Total Eco Points: <strong className="text-amber-300 font-mono text-sm">{user?.ecoPoints || 420}</strong>
          </div>
          <div className="text-xs text-emerald-200">
            Wellness Score: <strong className="text-white font-mono">{user?.wellnessScore || 88}/100</strong>
          </div>
        </div>
      </div>

      {/* Simple Active Challenges (Requested: Healthy Breakfast, Daily Walking, Drink More Water) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Active Challenges ({challenges.length})
          </h3>
          <span className="text-[11px] text-slate-400">Tap + to log progress</span>
        </div>

        <div className="space-y-2.5">
          {challenges.map(ch => {
            const Icon = getChallengeIcon(ch.icon);
            const percentage = Math.min(100, Math.round((ch.currentProgress / ch.goalProgress) * 100));

            return (
              <div
                key={ch.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-3.5 space-y-2.5 shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">
                        {ch.title}
                      </h4>
                      <p className="text-[11px] text-slate-500">{ch.subtitle}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-mono">
                      <Award className="w-3 h-3 text-amber-600" />
                      +{ch.points} pts
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">
                      Progress: <strong className="font-mono text-slate-800">{ch.currentProgress}</strong> / {ch.goalProgress} {ch.unit}
                    </span>
                    <span className="font-mono font-semibold text-emerald-700">{percentage}%</span>
                  </div>

                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        ch.isCompleted ? 'bg-emerald-600' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                {/* Footer badge & action */}
                <div className="pt-1 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-[11px] text-slate-600">
                    <span className="text-slate-400">Badge:</span>
                    <span className="font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                      🏅 {ch.badgeName}
                    </span>
                  </div>

                  {ch.isCompleted ? (
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Completed!</span>
                    </span>
                  ) : (
                    <button
                      onClick={() =>
                        updateChallengeProgress(
                          ch.id,
                          ch.unit === 'steps' ? 800 : 1
                        )
                      }
                      className="px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-semibold flex items-center gap-1 active:scale-95 cursor-pointer shadow-2xs"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Log {ch.unit === 'steps' ? '+800 steps' : `+1 ${ch.unit}`}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Community Leaderboard (Requested) */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Medal className="w-4 h-4 text-amber-500" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Community Leaderboard
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">Greenfield Heights</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-xs overflow-hidden">
          {leaderboard.map(lb => {
            return (
              <div
                key={lb.rank}
                className={`p-3 flex items-center justify-between text-xs ${
                  lb.isCurrentUser ? 'bg-emerald-50/60 font-semibold' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold font-mono text-[11px] ${
                      lb.rank === 1
                        ? 'bg-amber-400 text-amber-950'
                        : lb.rank === 2
                        ? 'bg-slate-300 text-slate-800'
                        : lb.rank === 3
                        ? 'bg-amber-700 text-amber-100'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {lb.rank}
                  </span>

                  <div>
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{lb.name}</span>
                      {lb.isCurrentUser && (
                        <span className="text-[10px] px-1.5 py-0.2 bg-emerald-600 text-white rounded-sm">
                          You
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400">{lb.flat}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold font-mono text-emerald-800">{lb.points} pts</div>
                  <div className="text-[10px] text-slate-400 flex items-center justify-end gap-0.5">
                    <Flame className="w-3 h-3 text-amber-500" />
                    <span>{lb.streakDays} day streak</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
