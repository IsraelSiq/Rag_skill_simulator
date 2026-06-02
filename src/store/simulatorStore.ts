import { create } from 'zustand'
import type { JobId, AllocatedSkills } from '@/types'
import { getJobChain, JOBS } from '@/data/jobs'
import { findSkill } from '@/data/skills'

interface SimulatorState {
  selectedJob: JobId | null
  jobChain: JobId[]
  allocated: AllocatedSkills
  usedPoints: number
  totalPoints: number

  selectJob: (jobId: JobId) => void
  setSkillLevel: (skillId: string, level: number) => void
  resetBuild: () => void
}

function calcTotalPoints(chain: JobId[]): number {
  return chain.reduce((acc, id) => {
    const job = JOBS.find((j) => j.id === id)
    return acc + (job?.skillPoints ?? 0)
  }, 0)
}

function calcUsed(allocated: AllocatedSkills): number {
  return Object.values(allocated).reduce((a, b) => a + b, 0)
}

function autoAllocateDeps(
  skillId: string,
  targetLevel: number,
  allocated: AllocatedSkills
): AllocatedSkills {
  const skill = findSkill(skillId)
  if (!skill) return allocated

  let result = { ...allocated }

  if (skill.requires) {
    for (const req of skill.requires) {
      const currentLevel = result[req.skillId] ?? 0
      if (currentLevel < req.level) {
        result = autoAllocateDeps(req.skillId, req.level, result)
        result[req.skillId] = Math.max(currentLevel, req.level)
      }
    }
  }

  result[skillId] = targetLevel
  return result
}

export const useSimulatorStore = create<SimulatorState>((set, get) => ({
  selectedJob: null,
  jobChain: [],
  allocated: {},
  usedPoints: 0,
  totalPoints: 0,

  selectJob: (jobId) => {
    const chain = getJobChain(jobId)
    const total = calcTotalPoints(chain)
    set({ selectedJob: jobId, jobChain: chain, allocated: {}, usedPoints: 0, totalPoints: total })
  },

  setSkillLevel: (skillId, level) => {
    const { allocated } = get()
    const newAllocated =
      level === 0
        ? (() => { const a = { ...allocated }; delete a[skillId]; return a })()
        : autoAllocateDeps(skillId, level, allocated)

    set({ allocated: newAllocated, usedPoints: calcUsed(newAllocated) })
  },

  resetBuild: () => {
    set({ allocated: {}, usedPoints: 0 })
  },
}))
