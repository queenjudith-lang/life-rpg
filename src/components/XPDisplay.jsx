import React from 'react';
import { useStore } from '../state/store';

const XPDisplay = () => {
  const { user } = useStore();
  if (!user) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="glass-card p-5">
        <div className="text-xs uppercase tracking-[0.2em] text-cyan-300">Current Level</div>
        <div className="text-4xl font-bold mt-3">{user.level}</div>
      </div>
      <div className="glass-card p-5">
        <div className="text-xs uppercase tracking-[0.2em] text-cyan-300">XP</div>
        <div className="text-4xl font-bold mt-3">{user.xp} / {user.maxXp}</div>
      </div>
      <div className="glass-card p-5">
        <div className="text-xs uppercase tracking-[0.2em] text-cyan-300">Streak</div>
        <div className="text-4xl font-bold mt-3">{user.streak}</div>
      </div>
    </div>
  );
};

export default XPDisplay;
