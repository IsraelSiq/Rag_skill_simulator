import type { JobId, Skill } from '@/types'
import { NOVICE_SKILLS } from './novice'
import { SWORDMAN_SKILLS } from './swordman'
import { MAGE_SKILLS } from './mage'
import { ARCHER_SKILLS } from './archer'
import { MERCHANT_SKILLS } from './merchant'
import { THIEF_SKILLS } from './thief'
import { ACOLYTE_SKILLS } from './acolyte'
import { KNIGHT_SKILLS } from './knight'
import { CRUSADER_SKILLS } from './crusader'
import { WIZARD_SKILLS } from './wizard'
import { SAGE_SKILLS } from './sage'
import { HUNTER_SKILLS } from './hunter'
import { BARD_SKILLS } from './bard'
import { DANCER_SKILLS } from './dancer'
import { BLACKSMITH_SKILLS } from './blacksmith'
import { ALCHEMIST_SKILLS } from './alchemist'
import { ASSASSIN_SKILLS } from './assassin'
import { ROGUE_SKILLS } from './rogue'
import { PRIEST_SKILLS } from './priest'
import { MONK_SKILLS } from './monk'
import { LORD_KNIGHT_SKILLS } from './lord-knight'
import { PALADIN_SKILLS } from './paladin'
import { HIGH_WIZARD_SKILLS } from './high-wizard'
import { PROFESSOR_SKILLS } from './professor'
import { SNIPER_SKILLS } from './sniper'
import { CLOWN_SKILLS } from './clown'
import { GYPSY_SKILLS } from './gypsy'
import { WHITESMITH_SKILLS } from './whitesmith'
import { CREATOR_SKILLS } from './creator'
import { ASSASSIN_CROSS_SKILLS } from './assassin-cross'
import { MINSTREL_SKILLS } from './minstrel'
import { WANDERER_SKILLS } from './wanderer'
import { MECHANIC_SKILLS } from './mechanic'
import { GENETIC_SKILLS } from './genetic'
import { GUILLOTINE_CROSS_SKILLS } from './guillotine-cross'
import { TROUBADOUR_SKILLS } from './troubadour'
import { TROUVERE_SKILLS } from './trouvere'
import { MEISTER_SKILLS } from './meister'
import { BIOLO_SKILLS } from './biolo'
import { NIGHT_WATCH_SKILLS } from './night-watch'

export const SKILLS_BY_JOB: Partial<Record<JobId, Skill[]>> = {
  // 1ª classe
  novice:     NOVICE_SKILLS,
  swordman:   SWORDMAN_SKILLS,
  mage:       MAGE_SKILLS,
  archer:     ARCHER_SKILLS,
  merchant:   MERCHANT_SKILLS,
  thief:      THIEF_SKILLS,
  acolyte:    ACOLYTE_SKILLS,
  // 2ª classe
  knight:     KNIGHT_SKILLS,
  crusader:   CRUSADER_SKILLS,
  wizard:     WIZARD_SKILLS,
  sage:       SAGE_SKILLS,
  hunter:     HUNTER_SKILLS,
  bard:       BARD_SKILLS,
  dancer:     DANCER_SKILLS,
  blacksmith: BLACKSMITH_SKILLS,
  alchemist:  ALCHEMIST_SKILLS,
  assassin:   ASSASSIN_SKILLS,
  rogue:      ROGUE_SKILLS,
  priest:     PRIEST_SKILLS,
  monk:       MONK_SKILLS,
  // Trans
  'lord-knight':    LORD_KNIGHT_SKILLS,
  'paladin':        PALADIN_SKILLS,
  'high-wizard':    HIGH_WIZARD_SKILLS,
  'professor':      PROFESSOR_SKILLS,
  'sniper':         SNIPER_SKILLS,
  'clown':          CLOWN_SKILLS,
  'gypsy':          GYPSY_SKILLS,
  'whitesmith':     WHITESMITH_SKILLS,
  'creator':        CREATOR_SKILLS,
  'assassin-cross': ASSASSIN_CROSS_SKILLS,
  // TODO: stalker, high-priest, champion
  // 3rd classes
  'minstrel':         MINSTREL_SKILLS,
  'wanderer':         WANDERER_SKILLS,
  'mechanic':         MECHANIC_SKILLS,
  'genetic':          GENETIC_SKILLS,
  'guillotine-cross': GUILLOTINE_CROSS_SKILLS,
  // TODO: shadow-chaser, archbishop, sura, rune-knight, royal-guard, warlock, sorcerer, ranger
  // 4th classes
  'troubadour':   TROUBADOUR_SKILLS,
  'trouvere':     TROUVERE_SKILLS,
  'meister':      MEISTER_SKILLS,
  'biolo':        BIOLO_SKILLS,
  'night-watch':  NIGHT_WATCH_SKILLS,
  // TODO: abyss-chaser, cardinal, inquisitor
  //       dragon-knight, imperial-guard, arch-mage, elemental-master, windhawk
}

export function getSkillsForChain(jobChain: JobId[]): { jobId: JobId; skills: Skill[] }[] {
  return jobChain
    .filter(id => SKILLS_BY_JOB[id])
    .map(id => ({ jobId: id, skills: SKILLS_BY_JOB[id]! }))
    .reverse()
}

export function findSkill(skillId: string): Skill | undefined {
  for (const skills of Object.values(SKILLS_BY_JOB)) {
    const found = skills?.find(s => s.id === skillId)
    if (found) return found
  }
  return undefined
}
