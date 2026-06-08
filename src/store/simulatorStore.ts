import { create } from 'zustand'
import type { JobId, AllocatedSkills } from '@/types'

interface JobMeta {
  name: string
  icon?: string
  skillPoints: number
  parent?: JobId
}

interface SimulatorState {
  selectedJob: JobId | null
  jobChain: JobId[]
  jobMeta: Record<string, JobMeta>
  allocated: AllocatedSkills
  usedPoints: number
  totalPoints: number

  selectJob: (jobId: JobId, chain: JobId[], meta: Record<string, JobMeta>) => void
  setSkillLevel: (skillId: string, level: number) => void
  resetBuild: () => void
}

function calcTotalPoints(chain: JobId[], meta: Record<string, JobMeta>): number {
  return chain.reduce((acc, id) => acc + (meta[id]?.skillPoints ?? 0), 0)
}

function calcUsed(allocated: AllocatedSkills): number {
  return Object.values(allocated).reduce((a, b) => a + b, 0)
}

export const useSimulatorStore = create<SimulatorState>((set, get) => ({
  selectedJob: null,
  jobChain: [],
  jobMeta: {},
  allocated: {},
  usedPoints: 0,
  totalPoints: 0,

  selectJob: (jobId, chain, meta) => {
    const total = calcTotalPoints(chain, meta)
    set({ selectedJob: jobId, jobChain: chain, jobMeta: meta, allocated: {}, usedPoints: 0, totalPoints: total })
  },

  setSkillLevel: (skillId, level) => {
    const { allocated } = get()
    const newAllocated =
      level === 0
        ? (() => { const a = { ...allocated }; delete a[skillId]; return a })()
        : { ...allocated, [skillId]: level }
    set({ allocated: newAllocated, usedPoints: calcUsed(newAllocated) })
  },

  resetBuild: () => set({ allocated: {}, usedPoints: 0 }),
}))
