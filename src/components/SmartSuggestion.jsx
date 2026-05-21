import React from 'react';
import { useStore } from '../state/store';

const SmartSuggestion = () => {
  const { user } = useStore();
  if (!user) return null;

  const completedToday = user.completedToday.length;
  const suggestion = completedToday === 0
    ? 'Start your day with one small quest – momentum builds!' 
    : completedToday < 3
      ? 'Complete 3 quests to earn a bonus 50 XP.'
      : 'Amazing consistency! Try a hard quest for double rewards.';

  return (
    <div className="glass-card p-6 mt-6">
      <h2 className="text-xl font-bold mb-2">Smart Suggestion</h2>
      <p className="text-gray-300">{suggestion}</p>
    </div>
  );
};

export default SmartSuggestion;
