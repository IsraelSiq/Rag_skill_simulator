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
  // retorna true se alocou, false se foi bloqueado por falta de SP
  setSkillLevel: (skillId: string, level: number) => boolean
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
    const { allocated, usedPoints, totalPoints } = get()

    // decrementar ou zerar: sempre permitido
    if (level <= (allocated[skillId] ?? 0)) {
      const newAllocated =
        level === 0
          ? (() => { const a = { ...allocated }; delete a[skillId]; return a })()
          : { ...allocated, [skillId]: level }
      set({ allocated: newAllocated, usedPoints: calcUsed(newAllocated) })
      return true
    }

    // incrementar: verificar se cabe
    const increment = level - (allocated[skillId] ?? 0)
    if (usedPoints + increment > totalPoints) return false

    const newAllocated = { ...allocated, [skillId]: level }
    set({ allocated: newAllocated, usedPoints: calcUsed(newAllocated) })
    return true
  },

  resetBuild: () => set({ allocated: {}, usedPoints: 0 }),
}))
