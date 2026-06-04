import { getSkillsForChain } from '@/data/skills'
import { JOBS } from '@/data/jobs'
import { SkillCard } from './SkillCard'
import type { JobId, AllocatedSkills } from '@/types'

interface Props {
  jobChain: JobId[]
  allocated: AllocatedSkills
  onSetLevel: (skillId: string, level: number) => void
}

function calcSectionSP(skillIds: string[], allocated: AllocatedSkills): number {
  return skillIds.reduce((acc, id) => acc + (allocated[id] ?? 0), 0)
}

function calcSectionMax(skills: { maxLevel: number }[]): number {
  return skills.reduce((acc, s) => acc + s.maxLevel, 0)
}

export function SkillTree({ jobChain, allocated, onSetLevel }: Props) {
  const sections = getSkillsForChain(jobChain)

  if (sections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <span className="text-5xl">🚧</span>
        <p className="text-rag-muted text-sm text-center max-w-xs">
          Skills dessa classe ainda não foram cadastradas. Em breve!
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-10">
      {sections.map(({ jobId, skills }) => {
        const job     = JOBS.find(j => j.id === jobId)
        const used    = calcSectionSP(skills.map(s => s.id), allocated)
        const max     = calcSectionMax(skills)
        const pct     = max === 0 ? 0 : Math.min(100, Math.round((used / max) * 100))
        const isFull  = used >= max
        const isEmpty = used === 0

        return (
          <section key={jobId}>
            {/* Cabeçalho da seção */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{job?.icon}</span>
              <h2 className="font-display font-bold text-rag-text text-lg">{job?.name}</h2>

              {/* Barra de SP da seção */}
              <div className="flex items-center gap-2 ml-1">
                <div className="hidden sm:block w-16 h-1 bg-rag-faint/20 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isFull  ? 'bg-rag-gold'
                      : isEmpty ? 'bg-transparent'
                      : 'bg-rag-accent/60'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs tabular-nums whitespace-nowrap">
                  <span className={`font-semibold ${
                    isFull ? 'text-rag-gold' : isEmpty ? 'text-rag-faint' : 'text-rag-muted'
                  }`}>
                    {used}
                  </span>
                  <span className="text-rag-faint">/{max}</span>
                </span>
              </div>

              <div className="h-px flex-1 bg-rag-border" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {skills.map(skill => (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  currentLevel={allocated[skill.id] ?? 0}
                  allocated={allocated}
                  onSetLevel={onSetLevel}
                />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
