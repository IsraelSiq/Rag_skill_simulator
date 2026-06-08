import type { Job, Skill, JobId } from '@/types'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'https://rag-api-ochre.vercel.app'

// ─── tipos raw da API (snake_case) ───────────────────────────────────────────
interface ApiJob {
  id: string
  name: string
  tier: number
  parent_id: string | null
  skill_points: number
  icon: string | null
  expanded: boolean
}

interface ApiSkill {
  id: string
  name: string
  type: 'active' | 'passive' | 'toggle'
  element: string | null
  max_level: number
  description: string
  job_id: string
  requires: { skillId: string; level: number }[] | null
}

// ─── mappers ─────────────────────────────────────────────────────────────────
function mapJob(raw: ApiJob): Omit<Job, 'tree' | 'skills'> & { parent?: JobId } {
  return {
    id: raw.id as JobId,
    name: raw.name,
    tier: raw.tier as 1 | 2 | 3 | 4 | 5,
    parent: (raw.parent_id ?? undefined) as JobId | undefined,
    maxSkillPoints: raw.skill_points,
  }
}

function mapSkill(raw: ApiSkill): Skill {
  return {
    id: raw.id,
    name: raw.name,
    type: raw.type,
    element: raw.element ?? undefined,
    maxLevel: raw.max_level,
    description: raw.description,
    requires: raw.requires ?? undefined,
  }
}

// ─── funções públicas ─────────────────────────────────────────────────────────
export async function fetchJobs(): Promise<ApiJob[]> {
  const res = await fetch(`${BASE_URL}/api/jobs`)
  if (!res.ok) throw new Error(`fetchJobs falhou: ${res.status}`)
  const data: ApiJob[] = await res.json()
  return data
}

export async function fetchSkillsByJob(jobId: string): Promise<Skill[]> {
  const res = await fetch(`${BASE_URL}/api/skills?job_id=${jobId}`)
  if (!res.ok) throw new Error(`fetchSkills falhou: ${res.status}`)
  const data: ApiSkill[] = await res.json()
  return data.map(mapSkill)
}

export { mapJob }
export type { ApiJob }
