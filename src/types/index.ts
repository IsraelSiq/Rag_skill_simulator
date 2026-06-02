export type JobTree = 'novice' | 'swordman' | 'mage' | 'archer' | 'merchant' | 'thief' | 'acolyte'

export type JobId =
  // 1st
  | 'novice'
  | 'swordman' | 'mage' | 'archer' | 'merchant' | 'thief' | 'acolyte'
  // 2nd
  | 'knight' | 'crusader'
  | 'wizard' | 'sage'
  | 'hunter' | 'bard' | 'dancer'
  | 'blacksmith' | 'alchemist'
  | 'assassin' | 'rogue'
  | 'priest' | 'monk'
  // Trans
  | 'lord-knight' | 'paladin'
  | 'high-wizard' | 'professor'
  | 'sniper' | 'clown' | 'gypsy'
  | 'whitesmith' | 'creator'
  | 'assassin-cross' | 'stalker'
  | 'high-priest' | 'champion'
  // 3rd
  | 'rune-knight' | 'royal-guard'
  | 'warlock' | 'sorcerer'
  | 'ranger' | 'minstrel' | 'wanderer'
  | 'mechanic' | 'genetic'
  | 'guillotine-cross' | 'shadow-chaser'
  | 'archbishop' | 'sura'
  // 4th
  | 'dragon-knight' | 'imperial-guard'
  | 'arch-mage' | 'elemental-master'
  | 'windhawk' | 'troubadour' | 'trouvere'
  | 'meister' | 'biolo'
  | 'night-watch' | 'abyss-chaser'
  | 'cardinal' | 'inquisitor'

export interface Skill {
  id: string
  name: string
  maxLevel: number
  type: 'active' | 'passive' | 'toggle'
  element?: string
  description: string
  requires?: { skillId: string; level: number }[]
  // nivel minimo de job pra desbloquear
  jobLevelReq?: number
}

export interface Job {
  id: JobId
  name: string
  tree: JobTree
  tier: 1 | 2 | 3 | 4
  parent?: JobId
  maxSkillPoints: number
  skills: Skill[]
}

export interface AllocatedSkills {
  [skillId: string]: number
}

export interface SimulatorState {
  selectedJob: JobId | null
  // stack de jobs para herdar skills (ex: lord-knight herda knight e swordman)
  jobChain: JobId[]
  allocated: AllocatedSkills
  totalPoints: number
  usedPoints: number

  selectJob: (jobId: JobId) => void
  setSkillLevel: (skillId: string, level: number) => void
  resetBuild: () => void
}
