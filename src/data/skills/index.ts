import type { JobId, Skill } from '@/types'
import { NOVICE_SKILLS } from './novice'
import { SWORDMAN_SKILLS } from './swordman'
import { MAGE_SKILLS } from './mage'
import { ARCHER_SKILLS } from './archer'
import { MERCHANT_SKILLS } from './merchant'
import { THIEF_SKILLS } from './thief'
import { ACOLYTE_SKILLS } from './acolyte'
import { KNIGHT_SKILLS } from './knight'
import { WIZARD_SKILLS } from './wizard'
import { HUNTER_SKILLS } from './hunter'
import { ASSASSIN_SKILLS } from './assassin'
import { PRIEST_SKILLS } from './priest'

// Mapa de skills por jobId
export const SKILLS_BY_JOB: Partial<Record<JobId, Skill[]>> = {
  // 1ª classe
  novice:    NOVICE_SKILLS,
  swordman:  SWORDMAN_SKILLS,
  mage:      MAGE_SKILLS,
  archer:    ARCHER_SKILLS,
  merchant:  MERCHANT_SKILLS,
  thief:     THIEF_SKILLS,
  acolyte:   ACOLYTE_SKILLS,
  // 2ª classe
  knight:    KNIGHT_SKILLS,
  wizard:    WIZARD_SKILLS,
  hunter:    HUNTER_SKILLS,
  assassin:  ASSASSIN_SKILLS,
  priest:    PRIEST_SKILLS,
  // TODO: crusader, rogue, bard, dancer, blacksmith, alchemist, monk, sage
  // TODO: Trans classes (lord-knight, high-wizard, sniper, assassin-cross, high-priest, etc.)
  // TODO: 3rd classes (rune-knight, warlock, ranger, etc.)
  // TODO: 4th classes (dragon-knight, arch-mage, etc.)
}

// Retorna todas as skills disponíveis para uma chain de jobs
export function getSkillsForChain(jobChain: JobId[]): { jobId: JobId; skills: Skill[] }[] {
  return jobChain
    .filter(id => SKILLS_BY_JOB[id])
    .map(id => ({ jobId: id, skills: SKILLS_BY_JOB[id]! }))
    .reverse() // exibe na ordem: classe base primeiro
}

export function findSkill(skillId: string): Skill | undefined {
  for (const skills of Object.values(SKILLS_BY_JOB)) {
    const found = skills?.find(s => s.id === skillId)
    if (found) return found
  }
  return undefined
}
