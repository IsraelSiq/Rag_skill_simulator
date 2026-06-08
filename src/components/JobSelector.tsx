import { useState, useMemo } from 'react'
import { useJobs, type JobSummary } from '@/hooks/useJobs'
import type { JobId } from '@/types'

// ─── tipos ───────────────────────────────────────────────────────────────────

type Tab = 'all' | '1' | '2' | '3' | '4'

const TAB_LABELS: Record<Tab, string> = {
  all: 'Todos',
  '1': '1ª Classe',
  '2': '2ª Classe',
  '3': 'Transcendente',
  '4': '3ª / 4ª Classe',
}

const TIER_ACCENT: Record<number, { border: string; text: string; bg: string; dot: string }> = {
  1: { border: 'border-rag-muted/40',  text: 'text-rag-muted',  bg: 'bg-rag-surface2',  dot: 'bg-rag-muted' },
  2: { border: 'border-rag-accent/40', text: 'text-rag-accent', bg: 'bg-rag-accent/5',  dot: 'bg-rag-accent' },
  3: { border: 'border-rag-gold/40',   text: 'text-rag-gold',   bg: 'bg-rag-gold/5',    dot: 'bg-rag-gold' },
  4: { border: 'border-purple-500/40', text: 'text-purple-400', bg: 'bg-purple-500/5',  dot: 'bg-purple-400' },
  5: { border: 'border-purple-500/40', text: 'text-purple-400', bg: 'bg-purple-500/5',  dot: 'bg-purple-400' },
}

const TIER_BADGE: Record<number, string> = {
  1: '1ª', 2: '2ª', 3: 'Trans', 4: '3~4ª', 5: '4ª'
}

// ─── skeleton ────────────────────────────────────────────────────────────────

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
      {Array.from({ length: 24 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl border border-rag-border bg-rag-surface2 animate-pulse">
          <div className="w-8 h-8 rounded-lg bg-rag-faint/20" />
          <div className="w-12 h-2.5 rounded bg-rag-faint/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-rag-faint/20" />
        </div>
      ))}
    </div>
  )
}

// ─── componente principal ────────────────────────────────────────────────────

interface Props {
  onSelect: (id: JobId) => void
}

export function JobSelector({ onSelect }: Props) {
  const { data: jobs, loading, error } = useJobs()
  const [activeTab, setActiveTab] = useState<Tab>('all')
  const [search, setSearch]       = useState('')
  const [hoveredId, setHoveredId] = useState<JobId | null>(null)

  const jobsFiltered = useMemo(() => {
    const base = activeTab === 'all'
      ? jobs.filter(j => j.id !== 'novice')
      : jobs.filter(j => j.tier === Number(activeTab) && j.id !== 'novice')
    const q = search.trim().toLowerCase()
    return q ? base.filter(j => j.name.toLowerCase().includes(q)) : base
  }, [jobs, activeTab, search])

  const groupedByTier = useMemo(() => {
    const groups: Record<number, JobSummary[]> = {}
    for (const job of jobsFiltered) {
      if (!groups[job.tier]) groups[job.tier] = []
      groups[job.tier].push(job)
    }
    return groups
  }, [jobsFiltered])

  const hoveredChain = useMemo(() => {
    if (!hoveredId) return []
    const result: JobSummary[] = []
    let current: JobSummary | undefined = jobs.find(j => j.id === hoveredId)
    while (current) {
      result.unshift(current)
      current = current.parent ? jobs.find(j => j.id === current!.parent) : undefined
    }
    return result
  }, [hoveredId, jobs])

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h2 className="font-display font-bold text-rag-text text-2xl mb-1">Escolha sua Classe</h2>
        <p className="text-rag-muted text-sm">Selecione qualquer classe para ver e simular suas skills</p>
      </div>

      {/* Search */}
      <div className="relative max-w-xs mx-auto w-full">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-rag-faint pointer-events-none"
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input type="text" placeholder="Buscar classe..." value={search}
          onChange={e => { setSearch(e.target.value); setActiveTab('all') }}
          className="w-full pl-8 pr-4 py-2 rounded-xl bg-rag-surface2 border border-rag-border
                     text-sm text-rag-text placeholder:text-rag-faint
                     focus:outline-none focus:border-rag-accent/60 focus:ring-1 focus:ring-rag-accent/30 transition-colors"
        />
        {search && (
          <button onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-rag-faint hover:text-rag-muted transition-colors"
            aria-label="Limpar busca">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Tabs */}
      {!search && (
        <div className="flex gap-1.5 justify-center flex-wrap">
          {(Object.keys(TAB_LABELS) as Tab[]).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all
                ${ activeTab === tab
                  ? 'border-rag-accent/60 bg-rag-accent/15 text-rag-accent'
                  : 'border-rag-border bg-rag-surface2 text-rag-muted hover:text-rag-text'
                }`}>
              {TAB_LABELS[tab]}
              {tab !== 'all' && (
                <span className={`ml-1.5 tabular-nums ${ activeTab === tab ? 'text-rag-accent/70' : 'text-rag-faint' }`}>
                  {jobs.filter(j => j.tier === Number(tab) && j.id !== 'novice').length}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Corpo */}
      <div className="flex gap-6 items-start">
        <div className="flex-1 min-w-0">
          {error ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <span className="text-4xl">⚠️</span>
              <p className="text-rag-muted text-sm">Erro ao carregar classes. Tente novamente.</p>
              <p className="text-rag-faint text-xs">{error}</p>
            </div>
          ) : loading ? (
            <SkeletonGrid />
          ) : jobsFiltered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <span className="text-4xl opacity-40">🔍</span>
              <p className="text-rag-muted text-sm">Nenhuma classe encontrada para "{search}"</p>
            </div>
          ) : activeTab === 'all' && !search ? (
            <div className="flex flex-col gap-8">
              {([1, 2, 3, 4, 5] as const).map(tier => {
                const tierJobs = groupedByTier[tier]
                if (!tierJobs?.length) return null
                const accent = TIER_ACCENT[tier]
                return (
                  <div key={tier}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${accent.border} ${accent.text} ${accent.bg}`}>
                        {TAB_LABELS[String(tier) as Tab] ?? `${tier}ª Classe`}
                      </span>
                      <div className="h-px flex-1 bg-rag-border" />
                    </div>
                    <JobGrid jobs={tierJobs} hoveredId={hoveredId} onHover={setHoveredId} onSelect={onSelect} />
                  </div>
                )
              })}
            </div>
          ) : (
            <JobGrid jobs={jobsFiltered} hoveredId={hoveredId} onHover={setHoveredId} onSelect={onSelect} />
          )}
        </div>

        {/* Panel lateral de progressão */}
        <div className="hidden lg:flex w-52 shrink-0 flex-col gap-2 sticky top-6">
          <p className="text-rag-faint text-xs font-semibold uppercase tracking-widest mb-1">Progressão</p>
          {hoveredChain.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <svg className="text-rag-faint opacity-40" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22V12m0-10v3M4.93 4.93l2.12 2.12M19.07 4.93l-2.12 2.12M22 12h-3M5 12H2m2.93 7.07 2.12-2.12M19.07 19.07l-2.12-2.12" />
              </svg>
              <p className="text-rag-faint text-xs">Passe o mouse em uma classe</p>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {hoveredChain.map((job, i) => {
                const accent = TIER_ACCENT[job.tier]
                const isLast = i === hoveredChain.length - 1
                return (
                  <div key={job.id} className="flex flex-col items-start">
                    <button onClick={() => onSelect(job.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl border text-left transition-all
                        ${ isLast
                          ? `${accent.border} ${accent.bg} ${accent.text} font-semibold shadow-sm`
                          : 'border-rag-border/40 bg-transparent text-rag-muted hover:text-rag-text hover:border-rag-border'
                        }`}>
                      <span className="text-base shrink-0">{job.icon}</span>
                      <div className="min-w-0">
                        <p className={`text-xs leading-tight truncate ${ isLast ? accent.text : 'text-rag-muted' }`}>{job.name}</p>
                        <p className="text-rag-faint text-xs">{TIER_BADGE[job.tier]}</p>
                      </div>
                    </button>
                    {!isLast && <div className="ml-5 w-px h-2 bg-rag-border" />}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── sub-componente: grid de cards ──────────────────────────────────────────

interface GridProps {
  jobs: JobSummary[]
  hoveredId: JobId | null
  onHover: (id: JobId | null) => void
  onSelect: (id: JobId) => void
}

function JobGrid({ jobs, hoveredId, onHover, onSelect }: GridProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
      {jobs.map(job => {
        const accent = TIER_ACCENT[job.tier]
        const isHovered = hoveredId === job.id
        return (
          <button key={job.id}
            onClick={() => onSelect(job.id)}
            onMouseEnter={() => onHover(job.id)}
            onMouseLeave={() => onHover(null)}
            className={`flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl border text-center
              transition-all duration-150 active:scale-95
              ${ isHovered
                ? `${accent.border} ${accent.bg} scale-105 shadow-lg`
                : 'border-rag-border bg-rag-surface2 hover:border-rag-border'
              }`}>
            <span className="text-2xl leading-none">{job.icon}</span>
            <span className={`text-xs font-semibold leading-tight ${ isHovered ? accent.text : 'text-rag-muted' }`}>
              {job.name}
            </span>
            <span className={`w-1.5 h-1.5 rounded-full ${ isHovered ? accent.dot : 'bg-rag-faint' }`} />
          </button>
        )
      })}
    </div>
  )
}
