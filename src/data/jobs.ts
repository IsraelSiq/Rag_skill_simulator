import type { JobId } from '@/types'

export interface JobMeta {
  id: JobId
  name: string
  tier: 1 | 2 | 3 | 4 | 5
  parent?: JobId
  skillPoints: number
  icon: string
}

export const JOBS: JobMeta[] = [
  // ─── Tier 1 ─────────────────────────────────────────────────────────────────
  { id: 'novice',    name: 'Novice',    tier: 1, skillPoints: 10,  icon: '👶' },
  { id: 'swordman',  name: 'Swordman',  tier: 1, skillPoints: 42,  icon: '⚔️' },
  { id: 'mage',      name: 'Mage',      tier: 1, skillPoints: 45,  icon: '🔮' },
  { id: 'archer',    name: 'Archer',    tier: 1, skillPoints: 42,  icon: '🏹' },
  { id: 'merchant',  name: 'Merchant',  tier: 1, skillPoints: 42,  icon: '💰' },
  { id: 'thief',     name: 'Thief',     tier: 1, skillPoints: 42,  icon: '🗡️' },
  { id: 'acolyte',   name: 'Acolyte',   tier: 1, skillPoints: 42,  icon: '✝️' },

  // ─── Tier 2 ─────────────────────────────────────────────────────────────────
  { id: 'knight',      name: 'Knight',      tier: 2, parent: 'swordman',  skillPoints: 84,  icon: '🛡️' },
  { id: 'crusader',    name: 'Crusader',    tier: 2, parent: 'swordman',  skillPoints: 84,  icon: '✠' },
  { id: 'wizard',      name: 'Wizard',      tier: 2, parent: 'mage',      skillPoints: 84,  icon: '🌀' },
  { id: 'sage',        name: 'Sage',        tier: 2, parent: 'mage',      skillPoints: 84,  icon: '📖' },
  { id: 'hunter',      name: 'Hunter',      tier: 2, parent: 'archer',    skillPoints: 84,  icon: '🎯' },
  { id: 'bard',        name: 'Bard',        tier: 2, parent: 'archer',    skillPoints: 84,  icon: '🎵' },
  { id: 'dancer',      name: 'Dancer',      tier: 2, parent: 'archer',    skillPoints: 84,  icon: '💃' },
  { id: 'blacksmith',  name: 'Blacksmith',  tier: 2, parent: 'merchant',  skillPoints: 84,  icon: '🔨' },
  { id: 'alchemist',   name: 'Alchemist',   tier: 2, parent: 'merchant',  skillPoints: 84,  icon: '⚗️' },
  { id: 'assassin',    name: 'Assassin',    tier: 2, parent: 'thief',     skillPoints: 84,  icon: '🥷' },
  { id: 'rogue',       name: 'Rogue',       tier: 2, parent: 'thief',     skillPoints: 84,  icon: '🎭' },
  { id: 'priest',      name: 'Priest',      tier: 2, parent: 'acolyte',   skillPoints: 84,  icon: '🙏' },
  { id: 'monk',        name: 'Monk',        tier: 2, parent: 'acolyte',   skillPoints: 84,  icon: '👊' },

  // ─── Tier 3 (Trans) ─────────────────────────────────────────────────────────
  { id: 'lord-knight',     name: 'Lord Knight',     tier: 3, parent: 'knight',     skillPoints: 134, icon: '👑' },
  { id: 'paladin',         name: 'Paladin',          tier: 3, parent: 'crusader',   skillPoints: 134, icon: '🌟' },
  { id: 'high-wizard',     name: 'High Wizard',      tier: 3, parent: 'wizard',     skillPoints: 134, icon: '💥' },
  { id: 'professor',       name: 'Professor',        tier: 3, parent: 'sage',       skillPoints: 134, icon: '🧪' },
  { id: 'sniper',          name: 'Sniper',           tier: 3, parent: 'hunter',     skillPoints: 134, icon: '🎯' },
  { id: 'clown',           name: 'Clown',            tier: 3, parent: 'bard',       skillPoints: 134, icon: '🤡' },
  { id: 'gypsy',           name: 'Gypsy',            tier: 3, parent: 'dancer',     skillPoints: 134, icon: '🌹' },
  { id: 'whitesmith',      name: 'Whitesmith',       tier: 3, parent: 'blacksmith', skillPoints: 134, icon: '⚒️' },
  { id: 'creator',         name: 'Creator',          tier: 3, parent: 'alchemist',  skillPoints: 134, icon: '🧬' },
  { id: 'assassin-cross',  name: 'Assassin Cross',   tier: 3, parent: 'assassin',   skillPoints: 134, icon: '☠️' },
  { id: 'stalker',         name: 'Stalker',          tier: 3, parent: 'rogue',      skillPoints: 134, icon: '👁️' },
  { id: 'high-priest',     name: 'High Priest',      tier: 3, parent: 'priest',     skillPoints: 134, icon: '✨' },
  { id: 'champion',        name: 'Champion',         tier: 3, parent: 'monk',       skillPoints: 134, icon: '🥋' },

  // ─── Tier 4 (3rd class) ─────────────────────────────────────────────────────
  { id: 'rune-knight',      name: 'Rune Knight',      tier: 4, parent: 'lord-knight',    skillPoints: 200, icon: '🔮' },
  { id: 'royal-guard',      name: 'Royal Guard',      tier: 4, parent: 'paladin',        skillPoints: 200, icon: '🛡️' },
  { id: 'warlock',          name: 'Warlock',          tier: 4, parent: 'high-wizard',    skillPoints: 200, icon: '🌑' },
  { id: 'sorcerer',         name: 'Sorcerer',         tier: 4, parent: 'professor',      skillPoints: 200, icon: '🌊' },
  { id: 'ranger',           name: 'Ranger',           tier: 4, parent: 'sniper',         skillPoints: 200, icon: '🦅' },
  { id: 'minstrel',         name: 'Minstrel',         tier: 4, parent: 'clown',          skillPoints: 200, icon: '🎶' },
  { id: 'wanderer',         name: 'Wanderer',         tier: 4, parent: 'gypsy',          skillPoints: 200, icon: '🌸' },
  { id: 'mechanic',         name: 'Mechanic',         tier: 4, parent: 'whitesmith',     skillPoints: 200, icon: '🤖' },
  { id: 'genetic',          name: 'Genetic',          tier: 4, parent: 'creator',        skillPoints: 200, icon: '🦫' },
  { id: 'guillotine-cross', name: 'Guillotine Cross', tier: 4, parent: 'assassin-cross', skillPoints: 200, icon: '💠' },
  { id: 'shadow-chaser',    name: 'Shadow Chaser',    tier: 4, parent: 'stalker',        skillPoints: 200, icon: '🌫️' },
  { id: 'archbishop',       name: 'Archbishop',       tier: 4, parent: 'high-priest',    skillPoints: 200, icon: '⛪' },
  { id: 'sura',             name: 'Sura',             tier: 4, parent: 'champion',       skillPoints: 200, icon: '🌪️' },

  // ─── Tier 5 (4th class) ─────────────────────────────────────────────────────
  { id: 'dragon-knight',    name: 'Dragon Knight',    tier: 5, parent: 'rune-knight',      skillPoints: 250, icon: '🐉' },
  { id: 'imperial-guard',   name: 'Imperial Guard',   tier: 5, parent: 'royal-guard',      skillPoints: 250, icon: '🏰' },
  { id: 'arch-mage',        name: 'Arch Mage',        tier: 5, parent: 'warlock',          skillPoints: 250, icon: '⚡' },
  { id: 'elemental-master', name: 'Elemental Master', tier: 5, parent: 'sorcerer',         skillPoints: 250, icon: '🌈' },
  { id: 'wind-hawk',        name: 'Wind Hawk',        tier: 5, parent: 'ranger',           skillPoints: 250, icon: '🦆' },
  { id: 'troubadour',       name: 'Troubadour',       tier: 5, parent: 'minstrel',         skillPoints: 250, icon: '🎸' },
  { id: 'trouvere',         name: 'Trouvere',         tier: 5, parent: 'wanderer',         skillPoints: 250, icon: '🎻' },
  { id: 'meister',          name: 'Meister',          tier: 5, parent: 'mechanic',         skillPoints: 250, icon: '⚙️' },
  { id: 'biolo',            name: 'Biolo',            tier: 5, parent: 'genetic',          skillPoints: 250, icon: '🔬' },
  { id: 'shadow-cross',     name: 'Shadow Cross',     tier: 5, parent: 'guillotine-cross', skillPoints: 250, icon: '🌙' },
  { id: 'abyss-chaser',     name: 'Abyss Chaser',     tier: 5, parent: 'shadow-chaser',   skillPoints: 250, icon: '🕳️' },
  { id: 'cardinal',         name: 'Cardinal',         tier: 5, parent: 'archbishop',       skillPoints: 250, icon: '👼' },
  { id: 'inquisitor',       name: 'Inquisitor',       tier: 5, parent: 'sura',             skillPoints: 250, icon: '⚖️' },
]

export function getJobChain(jobId: JobId): JobId[] {
  const chain: JobId[] = []
  let current: JobId | undefined = jobId
  while (current) {
    chain.push(current)
    const job = JOBS.find(j => j.id === current)
    current = job?.parent
  }
  if (!chain.includes('novice')) chain.push('novice')
  return chain
}

export const JOBS_BY_TIER: Record<number, JobMeta[]> = {
  1: JOBS.filter(j => j.tier === 1),
  2: JOBS.filter(j => j.tier === 2),
  3: JOBS.filter(j => j.tier === 3),
  4: JOBS.filter(j => j.tier === 4),
  5: JOBS.filter(j => j.tier === 5),
}

export function getJobChildren(jobId: JobId): JobMeta[] {
  return JOBS.filter(j => j.parent === jobId)
}
