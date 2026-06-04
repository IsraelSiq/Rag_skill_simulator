import type { JobId } from '@/types'

/**
 * Numeric job IDs used by the RO client sprite system.
 * Source: https://nn.ai4rei.net/dev/npclist/
 * Sprite URL: https://static.divine-pride.net/images/jobs/0/{id}.png
 */
export const JOB_SPRITE_ID: Partial<Record<JobId, number>> = {
  // 1st
  novice:       0,
  swordman:     1,
  mage:         2,
  archer:       3,
  acolyte:      4,
  merchant:     5,
  thief:        6,
  // 2nd
  knight:       7,
  priest:       8,
  wizard:       9,
  blacksmith:   10,
  hunter:       11,
  assassin:     12,
  crusader:     14,
  monk:         15,
  sage:         16,
  rogue:        17,
  alchemist:    18,
  bard:         19,
  dancer:       20,
  // Expanded 1st
  'super-novice': 23,
  gunslinger:   24,
  ninja:        25,
  // Trans (4000 series)
  'lord-knight':    4008,
  'high-priest':    4009,
  'high-wizard':    4010,
  whitesmith:       4011,
  sniper:           4012,
  'assassin-cross': 4013,
  paladin:          4015,
  champion:         4016,
  professor:        4017,
  stalker:          4018,
  creator:          4019,
  clown:            4020,
  gypsy:            4021,
  // 3rd class (4054+)
  'rune-knight':      4054,
  'royal-guard':      4060,
  warlock:            4055,
  sorcerer:           4061,
  ranger:             4056,
  minstrel:           4062,
  wanderer:           4063,
  mechanic:           4057,
  genetic:            4058,
  'guillotine-cross': 4059,
  'shadow-chaser':    4064,
  archbishop:         4065,
  sura:               4066,
  // Expanded
  taekwon:          4046,
  'star-gladiator': 4047,
  'soul-linker':    4049,
  'kagerou':        4211,
  'oboro':          4212,
  rebellion:        4215,
  // 4th class (4302+)
  'dragon-knight':    4302,
  'imperial-guard':   4303,
  'arch-mage':        4304,
  'elemental-master': 4305,
  'wind-hawk':        4306,
  troubadour:         4307,
  trouvere:           4308,
  meister:            4309,
  biolo:              4310,
  'shadow-cross':     4311,
  'abyss-chaser':     4312,
  cardinal:           4313,
  inquisitor:         4314,
  // Expanded 3rd
  'star-emperor': 4220,
  'soul-reaper':  4221,
  'night-watch':  4222,
}

export function getJobSpriteUrl(jobId: JobId): string | null {
  const id = JOB_SPRITE_ID[jobId]
  if (id === undefined) return null
  return `https://static.divine-pride.net/images/jobs/0/${id}.png`
}
