export function calculateLevel(xp, maxXp) {
  let level = 1;
  let remainingXp = xp;
  let currentMax = maxXp;
  while (remainingXp >= currentMax) {
    level++;
    remainingXp -= currentMax;
    currentMax = Math.floor(currentMax * 1.2);
  }
  return { level, xp: remainingXp, maxXp: currentMax };
}

export function awardXP(amount, source) {
  // This will be called from store action; we export helper
  console.log(`Awarded ${amount} XP for ${source}`);
}