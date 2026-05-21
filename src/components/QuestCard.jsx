import React from 'react';

const QuestCard = ({ quest, onComplete }) => (
  <div className="glass-card p-5 flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold">{quest.name}</h3>
        <p className="text-sm text-gray-400">Reward: {quest.xp} XP</p>
      </div>
      <button
        onClick={onComplete}
        className="rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold hover:bg-cyan-500 transition"
      >
        Complete
      </button>
    </div>
  </div>
);

export default QuestCard;
