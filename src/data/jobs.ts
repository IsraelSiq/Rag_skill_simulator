import type { JobId } from '@/types'

export interface JobMeta {
  id: JobId
  name: string
  tier: 1 | 2 | 3 | 4 | 5
  parent?: JobId
  skillPoints: number
  icon: string
  expanded?: boolean // true = Expanded Class tree
}

export const JOBS: JobMeta[] = [
  // ─── Tier 1 ─────────────────────────────────────────────────────────────────
  { id: 'novice',       name: 'Novice',       tier: 1, skillPoints: 9,  icon: '👶' },
  { id: 'swordman',     name: 'Swordman',     tier: 1, skillPoints: 49, icon: '⚔️' },
  { id: 'mage',         name: 'Mage',         tier: 1, skillPoints: 49, icon: '🔮' },
  { id: 'archer',       name: 'Archer',       tier: 1, skillPoints: 49, icon: '🏹' },
  { id: 'merchant',     name: 'Merchant',     tier: 1, skillPoints: 49, icon: '💰' },
  { id: 'thief',        name: 'Thief',        tier: 1, skillPoints: 49, icon: '🗡️' },
  { id: 'acolyte',      name: 'Acolyte',      tier: 1, skillPoints: 49, icon: '✝️' },
  // Expanded 1st
  { id: 'taekwon',      name: 'Taekwon',      tier: 1, parent: 'novice', skillPoints: 49, icon: '🥊', expanded: true },
  { id: 'super-novice', name: 'Super Novice', tier: 1, parent: 'novice', skillPoints: 49, icon: '⭐', expanded: true },
  { id: 'ninja',        name: 'Ninja',        tier: 1, parent: 'novice', skillPoints: 49, icon: '🥷', expanded: true },
  { id: 'gunslinger',   name: 'Gunslinger',   tier: 1, parent: 'novice', skillPoints: 49, icon: '🔫', expanded: true },

  // ─── Tier 2 ─────────────────────────────────────────────────────────────────
  { id: 'knight',      name: 'Knight',      tier: 2, parent: 'swordman',  skillPoints: 69, icon: '🛡️' },
  { id: 'crusader',    name: 'Crusader',    tier: 2, parent: 'swordman',  skillPoints: 69, icon: '✠' },
  { id: 'wizard',      name: 'Wizard',      tier: 2, parent: 'mage',      skillPoints: 69, icon: '🌀' },
  { id: 'sage',        name: 'Sage',        tier: 2, parent: 'mage',      skillPoints: 69, icon: '📖' },
  { id: 'hunter',      name: 'Hunter',      tier: 2, parent: 'archer',    skillPoints: 69, icon: '🎯' },
  { id: 'bard',        name: 'Bard',        tier: 2, parent: 'archer',    skillPoints: 69, icon: '🎵' },
  { id: 'dancer',      name: 'Dancer',      tier: 2, parent: 'archer',    skillPoints: 69, icon: '💃' },
  { id: 'blacksmith',  name: 'Blacksmith',  tier: 2, parent: 'merchant',  skillPoints: 69, icon: '🔨' },
  { id: 'alchemist',   name: 'Alchemist',   tier: 2, parent: 'merchant',  skillPoints: 69, icon: '⚗️' },
  { id: 'assassin',    name: 'Assassin',    tier: 2, parent: 'thief',     skillPoints: 69, icon: '🥷' },
  { id: 'rogue',       name: 'Rogue',       tier: 2, parent: 'thief',     skillPoints: 69, icon: '🎭' },
  { id: 'priest',      name: 'Priest',      tier: 2, parent: 'acolyte',   skillPoints: 69, icon: '🙏' },
  { id: 'monk',        name: 'Monk',        tier: 2, parent: 'acolyte',   skillPoints: 69, icon: '👊' },
  // Expanded 2nd
  { id: 'star-gladiator',       name: 'Star Gladiator',       tier: 2, parent: 'taekwon',      skillPoints: 69, icon: '★', expanded: true },
  { id: 'soul-linker',          name: 'Soul Linker',          tier: 2, parent: 'taekwon',      skillPoints: 69, icon: '🔗', expanded: true },
  { id: 'expanded-super-novice', name: 'Expanded Super Novice', tier: 2, parent: 'super-novice', skillPoints: 69, icon: '⭐⭐', expanded: true },
  { id: 'kagerou',              name: 'Kagerou',              tier: 2, parent: 'ninja',         skillPoints: 69, icon: '🌸', expanded: true },
  { id: 'oboro',                name: 'Oboro',                tier: 2, parent: 'ninja',         skillPoints: 69, icon: '🌙', expanded: true },
  { id: 'rebellion',            name: 'Rebellion',            tier: 2, parent: 'gunslinger',   skillPoints: 69, icon: '🔥', expanded: true },

  // ─── Tier 3 (Trans) ─────────────────────────────────────────────────────────
  { id: 'lord-knight',     name: 'Lord Knight',     tier: 3, parent: 'knight',     skillPoints: 69, icon: '👑' },
  { id: 'paladin',         name: 'Paladin',          tier: 3, parent: 'crusader',   skillPoints: 69, icon: '🌟' },
  { id: 'high-wizard',     name: 'High Wizard',      tier: 3, parent: 'wizard',     skillPoints: 69, icon: '💥' },
  { id: 'professor',       name: 'Professor',        tier: 3, parent: 'sage',       skillPoints: 69, icon: '🧪' },
  { id: 'sniper',          name: 'Sniper',           tier: 3, parent: 'hunter',     skillPoints: 69, icon: '🎯' },
  { id: 'clown',           name: 'Clown',            tier: 3, parent: 'bard',       skillPoints: 69, icon: '🤡' },
  { id: 'gypsy',           name: 'Gypsy',            tier: 3, parent: 'dancer',     skillPoints: 69, icon: '🌹' },
  { id: 'whitesmith',      name: 'Whitesmith',       tier: 3, parent: 'blacksmith', skillPoints: 69, icon: '⚒️' },
  { id: 'creator',         name: 'Creator',          tier: 3, parent: 'alchemist',  skillPoints: 69, icon: '🧬' },
  { id: 'assassin-cross',  name: 'Assassin Cross',   tier: 3, parent: 'assassin',   skillPoints: 69, icon: '☠️' },
  { id: 'stalker',         name: 'Stalker',          tier: 3, parent: 'rogue',      skillPoints: 69, icon: '👁️' },
  { id: 'high-priest',     name: 'High Priest',      tier: 3, parent: 'priest',     skillPoints: 69, icon: '✨' },
  { id: 'champion',        name: 'Champion',         tier: 3, parent: 'monk',       skillPoints: 69, icon: '🥋' },
  // Expanded 3rd
  { id: 'star-emperor', name: 'Star Emperor', tier: 3, parent: 'star-gladiator', skillPoints: 69, icon: '🌟', expanded: true },
  { id: 'soul-reaper',  name: 'Soul Reaper',  tier: 3, parent: 'soul-linker',   skillPoints: 69, icon: '💀', expanded: true },
  { id: 'night-watch',  name: 'Night Watch',  tier: 3, parent: 'rebellion',     skillPoints: 69, icon: '🌌', expanded: true },

  // ─── Tier 4 (3rd class) ─────────────────────────────────────────────────────
  { id: 'rune-knight',      name: 'Rune Knight',      tier: 4, parent: 'lord-knight',    skillPoints: 69, icon: '🔮' },
  { id: 'royal-guard',      name: 'Royal Guard',      tier: 4, parent: 'paladin',        skillPoints: 69, icon: '🛡️' },
  { id: 'warlock',          name: 'Warlock',          tier: 4, parent: 'high-wizard',    skillPoints: 69, icon: '🌑' },
  { id: 'sorcerer',         name: 'Sorcerer',         tier: 4, parent: 'professor',      skillPoints: 69, icon: '🌊' },
  { id: 'ranger',           name: 'Ranger',           tier: 4, parent: 'sniper',         skillPoints: 69, icon: '🦅' },
  { id: 'minstrel',         name: 'Minstrel',         tier: 4, parent: 'clown',          skillPoints: 69, icon: '🎶' },
  { id: 'wanderer',         name: 'Wanderer',         tier: 4, parent: 'gypsy',          skillPoints: 69, icon: '🌸' },
  { id: 'mechanic',         name: 'Mechanic',         tier: 4, parent: 'whitesmith',     skillPoints: 69, icon: '🤖' },
  { id: 'genetic',          name: 'Genetic',          tier: 4, parent: 'creator',        skillPoints: 69, icon: '🦫' },
  { id: 'guillotine-cross', name: 'Guillotine Cross', tier: 4, parent: 'assassin-cross', skillPoints: 69, icon: '💠' },
  { id: 'shadow-chaser',    name: 'Shadow Chaser',    tier: 4, parent: 'stalker',        skillPoints: 69, icon: '🌫️' },
  { id: 'archbishop',       name: 'Archbishop',       tier: 4, parent: 'high-priest',    skillPoints: 69, icon: '⛪' },
  { id: 'sura',             name: 'Sura',             tier: 4, parent: 'champion',       skillPoints: 69, icon: '🌪️' },

  // ─── Tier 5 (4th class) ─────────────────────────────────────────────────────
  { id: 'dragon-knight',    name: 'Dragon Knight',    tier: 5, parent: 'rune-knight',      skillPoints: 54, icon: '🐉' },
  { id: 'imperial-guard',   name: 'Imperial Guard',   tier: 5, parent: 'royal-guard',      skillPoints: 54, icon: '🏰' },
  { id: 'arch-mage',        name: 'Arch Mage',        tier: 5, parent: 'warlock',          skillPoints: 54, icon: '⚡' },
  { id: 'elemental-master', name: 'Elemental Master', tier: 5, parent: 'sorcerer',         skillPoints: 54, icon: '🌈' },
  { id: 'wind-hawk',        name: 'Wind Hawk',        tier: 5, parent: 'ranger',           skillPoints: 54, icon: '🦆' },
  { id: 'troubadour',       name: 'Troubadour',       tier: 5, parent: 'minstrel',         skillPoints: 54, icon: '🎸' },
  { id: 'trouvere',         name: 'Trouvere',         tier: 5, parent: 'wanderer',         skillPoints: 54, icon: '🎻' },
  { id: 'meister',          name: 'Meister',          tier: 5, parent: 'mechanic',         skillPoints: 54, icon: '⚙️' },
  { id: 'biolo',            name: 'Biolo',            tier: 5, parent: 'genetic',          skillPoints: 54, icon: '🔬' },
  { id: 'shadow-cross',     name: 'Shadow Cross',     tier: 5, parent: 'guillotine-cross', skillPoints: 54, icon: '🌙' },
  { id: 'abyss-chaser',     name: 'Abyss Chaser',     tier: 5, parent: 'shadow-chaser',   skillPoints: 54, icon: '🕳️' },
  { id: 'cardinal',         name: 'Cardinal',         tier: 5, parent: 'archbishop',       skillPoints: 54, icon: '👼' },
  { id: 'inquisitor',       name: 'Inquisitor',       tier: 5, parent: 'sura',             skillPoints: 54, icon: '⚖️' },
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
