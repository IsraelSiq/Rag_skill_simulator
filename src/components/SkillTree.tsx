import { useSkills } from '@/hooks/useSkills'
import { SkillCard } from './SkillCard'
import type { JobId, AllocatedSkills, Skill } from '@/types'

interface Props {
  jobChain: JobId[]
  allocated: AllocatedSkills
  onSetLevel: (skillId: string, level: number) => boolean
  jobMeta?: Record<string, { name: string; icon?: string }>
}

function calcSectionSP(skillIds: string[], allocated: AllocatedSkills) {
  return skillIds.reduce((acc, id) => acc + (allocated[id] ?? 0), 0)
}

function calcSectionMax(skills: Skill[]) {
  return skills.reduce((acc, s) => acc + s.maxLevel, 0)
}

// ─── skeleton de seção ───────────────────────────────────────────────────────
function SkillSectionSkeleton() {
  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-rag-faint/20 animate-pulse" />
        <div className="w-24 h-4 rounded bg-rag-faint/20 animate-pulse" />
        <div className="h-px flex-1 bg-rag-border" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-32 rounded-xl bg-rag-surface2 border border-rag-border animate-pulse" />
        ))}
      </div>
    </section>
  )
}

// ─── seção de um job ─────────────────────────────────────────────────────────
function JobSection({
  jobId, allocated, onSetLevel, jobMeta
}: {
  jobId: JobId
  allocated: AllocatedSkills
  onSetLevel: (skillId: string, level: number) => boolean
  jobMeta?: Record<string, { name: string; icon?: string }>
}) {
  const { data: skills, loading, error } = useSkills(jobId)

  const meta = jobMeta?.[jobId]
  const used = calcSectionSP(skills.map(s => s.id), allocated)
  const max  = calcSectionMax(skills)
  const pct  = max === 0 ? 0 : Math.min(100, Math.round((used / max) * 100))
  const isFull  = used >= max && max > 0
  const isEmpty = used === 0

  if (loading) return <SkillSectionSkeleton />

  if (error) return (
    <section>
      <p className="text-rag-muted text-sm">⚠️ Erro ao carregar skills de {meta?.name ?? jobId}</p>
    </section>
  )

  if (skills.length === 0) return (
    <section>
      <div className="flex flex-col items-center justify-center py-12 gap-3">
        <span className="text-4xl">🚧</span>
        <p className="text-rag-muted text-sm text-center max-w-xs">
          Skills de {meta?.name ?? jobId} ainda não foram cadastradas.
        </p>
      </div>
    </section>
  )

  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{meta?.icon}</span>
        <h2 className="font-display font-bold text-rag-text text-lg">{meta?.name ?? jobId}</h2>
        <div className="flex items-center gap-2 ml-1">
          <div className="hidden sm:block w-16 h-1 bg-rag-faint/20 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-300 ${
              isFull ? 'bg-rag-gold' : isEmpty ? 'bg-transparent' : 'bg-rag-accent/60'
            }`} style={{ width: `${pct}%` }} />
          </div>
          <span className="text-xs tabular-nums whitespace-nowrap">
            <span className={`font-semibold ${
              isFull ? 'text-rag-gold' : isEmpty ? 'text-rag-faint' : 'text-rag-muted'
            }`}>{used}</span>
            <span className="text-rag-faint">/{max}</span>
          </span>
        </div>
        <div className="h-px flex-1 bg-rag-border" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {skills.map(skill => (
          <SkillCard key={skill.id} skill={skill}
            currentLevel={allocated[skill.id] ?? 0}
            allocated={allocated}
            onSetLevel={onSetLevel}
          />
        ))}
      </div>
    </section>
  )
}

// ─── componente principal ─────────────────────────────────────────────────────
export function SkillTree({ jobChain, allocated, onSetLevel, jobMeta }: Props) {
  if (jobChain.length === 0) return null

  return (
    <div className="flex flex-col gap-10">
      {jobChain.map(jobId => (
        <JobSection
          key={jobId}
          jobId={jobId}
          allocated={allocated}
          onSetLevel={onSetLevel}
          jobMeta={jobMeta}
        />
      ))}
    </div>
  )
}
