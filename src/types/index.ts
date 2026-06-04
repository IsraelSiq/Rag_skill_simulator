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
  | 'wind-hawk' | 'troubadour' | 'trouvere'
  | 'meister' | 'biolo'
  | 'shadow-cross' | 'abyss-chaser'
  | 'cardinal' | 'inquisitor'

export interface Skill {
  id: string
  name: string
  maxLevel: number
  type: 'active' | 'passive' | 'toggle'
  element?: string
  description: string
  requires?: { skillId: string; level: number }[]
  jobLevelReq?: number
}

export interface Job {
  id: JobId
  name: string
  tree: JobTree
  tier: 1 | 2 | 3 | 4 | 5
  parent?: JobId
  maxSkillPoints: number
  skills: Skill[]
}

export interface AllocatedSkills {
  [skillId: string]: number
}

export interface SimulatorState {
  selectedJob: JobId | null
  jobChain: JobId[]
  allocated: AllocatedSkills
  totalPoints: number
  usedPoints: number

  selectJob: (jobId: JobId) => void
  setSkillLevel: (skillId: string, level: number) => void
  resetBuild: () => void
}
