import { useState } from 'react'
import { useSimulatorStore } from '@/store/simulatorStore'
import { useJobs } from '@/hooks/useJobs'
import { JobSelector } from '@/components/JobSelector'
import { SkillTree } from '@/components/SkillTree'
import type { JobId } from '@/types'

// ─── Logo SVG inline ──────────────────────────────────────────────────────────
function LogoIcon() {
  return (
    <svg aria-label="RO Skill Simulator" viewBox="0 0 40 40" width="28" height="28"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 4 L34 10 L34 22 C34 30 20 37 20 37 C20 37 6 30 6 22 L6 10 Z" />
      <path d="M20 13 L27 20 L20 27 L13 20 Z" />
      <circle cx="20" cy="20" r="2" fill="currentColor" stroke="none" />
    </svg>
  )
}

// ─── SP progress bar ─────────────────────────────────────────────────────────
function SPBar({ used, total }: { used: number; total: number }) {
  const pct    = total === 0 ? 0 : Math.min(100, Math.round((used / total) * 100))
  const isFull = used >= total
  const isEmpty = used === 0
  return (
    <div className="flex items-center gap-2.5">
      <div className="hidden sm:block w-24 h-1.5 bg-rag-faint/30 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-300 ${
          isFull ? 'bg-rag-gold' : isEmpty ? 'bg-rag-faint' : 'bg-rag-accent'
        }`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs tabular-nums whitespace-nowrap">
        <span className={`font-bold ${ isFull ? 'text-rag-gold' : 'text-rag-accent' }`}>{used}</span>
        <span className="text-rag-faint"> / {total} SP</span>
      </span>
    </div>
  )
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
function JobBreadcrumb({ jobId, jobMeta }: { jobId: JobId; jobMeta: Record<string, { name: string; icon?: string }> }) {
  const meta = jobMeta[jobId]
  if (!meta) return null
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-sm leading-none">{meta.icon}</span>
      <span className="font-display text-sm font-semibold text-rag-text tracking-wide">{meta.name}</span>
    </div>
  )
}

// ─── página principal ─────────────────────────────────────────────────────────
export function SkillSimulator() {
  const { data: jobs } = useJobs()
  const {
    selectedJob, jobChain, jobMeta, allocated,
    usedPoints, totalPoints,
    selectJob, setSkillLevel, resetBuild,
  } = useSimulatorStore()

  const [showSelector, setShowSelector] = useState(!selectedJob)

  function buildChainAndMeta(id: JobId) {
    const chain: JobId[] = []
    const meta: Record<string, { name: string; icon?: string; skillPoints: number; parent?: JobId }> = {}
    let current = jobs.find(j => j.id === id)
    while (current) {
      chain.unshift(current.id)
      meta[current.id] = {
        name: current.name,
        icon: current.icon,
        skillPoints: current.maxSkillPoints,
        parent: current.parent,
      }
      current = current.parent ? jobs.find(j => j.id === current!.parent) : undefined
    }
    return { chain, meta }
  }

  function handleSelectJob(id: JobId) {
    const { chain, meta } = buildChainAndMeta(id)
    selectJob(id, chain, meta)
    setShowSelector(false)
  }

  return (
    <div className="min-h-screen bg-rag-bg text-rag-text font-body">
      <header className="sticky top-0 z-40 border-b border-rag-border bg-rag-surface/95 backdrop-blur-sm">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => setShowSelector(true)}
              className="text-rag-gold shrink-0 hover:text-rag-gold/80 transition-colors"
              aria-label="Ir para seleção de classe">
              <LogoIcon />
            </button>
            <div className="w-px h-5 bg-rag-border shrink-0" />
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-display text-sm font-bold text-rag-text tracking-widest uppercase hidden sm:block whitespace-nowrap">
                Skill Simulator
              </span>
              {selectedJob && !showSelector && (
                <>
                  <svg className="text-rag-faint shrink-0 hidden sm:block" width="12" height="12"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                  <JobBreadcrumb jobId={selectedJob} jobMeta={jobMeta} />
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {selectedJob && (
              <>
                <SPBar used={usedPoints} total={totalPoints} />
                <div className="w-px h-4 bg-rag-border" />
                <button onClick={resetBuild} title="Resetar todos os pontos"
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg
                             border border-rag-border bg-rag-surface2 text-rag-muted
                             hover:text-rag-text hover:border-rag-muted/40 transition-all">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                  <span className="hidden sm:inline">Resetar</span>
                </button>
                <button onClick={() => setShowSelector(true)}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg
                             border border-rag-accent/50 bg-rag-accent/10 text-rag-accent
                             hover:bg-rag-accent/20 hover:border-rag-accent/70 transition-all font-semibold">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M17 1l4 4-4 4" />
                    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                    <path d="M7 23l-4-4 4-4" />
                    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                  </svg>
                  <span className="hidden sm:inline">Trocar</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 md:px-6 py-6">
        {showSelector || !selectedJob ? (
          <JobSelector onSelect={handleSelectJob} />
        ) : (
          <SkillTree
            jobChain={jobChain}
            allocated={allocated}
            onSetLevel={setSkillLevel}
            jobMeta={jobMeta}
          />
        )}
      </main>
    </div>
  )
}
