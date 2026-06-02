import { getSkillsForChain } from '@/data/skills'
import { JOBS } from '@/data/jobs'
import { SkillCard } from './SkillCard'
import type { JobId, AllocatedSkills } from '@/types'

interface Props {
  jobChain: JobId[]
  allocated: AllocatedSkills
  onSetLevel: (skillId: string, level: number) => void
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
        const job = JOBS.find(j => j.id === jobId)
        return (
          <section key={jobId}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{job?.icon}</span>
              <h2 className="font-display font-bold text-rag-text text-lg">{job?.name}</h2>
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
