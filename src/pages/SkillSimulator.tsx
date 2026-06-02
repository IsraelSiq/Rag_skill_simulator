import { useState } from 'react'
import { useSimulatorStore } from '@/store/simulatorStore'
import { JobSelector } from '@/components/JobSelector'
import { SkillTree } from '@/components/SkillTree'
import type { JobId } from '@/types'

export function SkillSimulator() {
  const { selectedJob, jobChain, allocated, usedPoints, totalPoints, selectJob, setSkillLevel, resetBuild } = useSimulatorStore()
  const [showSelector, setShowSelector] = useState(!selectedJob)

  function handleSelectJob(id: JobId) {
    selectJob(id)
    setShowSelector(false)
  }

  return (
    <div className="min-h-screen bg-rag-bg text-rag-text font-body">
      {/* Header */}
      <header className="border-b border-rag-border bg-rag-surface px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg border border-rag-border bg-rag-surface2 flex items-center justify-center text-rag-gold">
            <svg viewBox="0 0 64 64" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="32" cy="20" r="12" />
              <path d="M20 20 L8 54 L32 44 L56 54 L44 20" />
              <path d="M32 32 L32 44" />
            </svg>
          </div>
          <div>
            <h1 className="font-display font-bold text-rag-text text-lg leading-tight">Skill Simulator</h1>
            <p className="text-rag-muted text-xs">TRUEMMO · RO 1st~4th classes</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {selectedJob && (
            <>
              <span className="text-xs text-rag-muted">
                <span className="text-rag-gold font-bold tabular-nums">{usedPoints}</span>
                <span className="text-rag-faint"> / {totalPoints} pts</span>
              </span>
              <button
                onClick={resetBuild}
                className="text-xs px-3 py-1.5 rounded-lg border border-rag-border bg-rag-surface2 text-rag-muted hover:text-rag-text hover:border-rag-accent/40 transition-colors"
              >
                Resetar
              </button>
              <button
                onClick={() => setShowSelector(true)}
                className="text-xs px-3 py-1.5 rounded-lg border border-rag-accent/50 bg-rag-accent/10 text-rag-accent hover:bg-rag-accent/20 transition-colors font-semibold"
              >
                Trocar Classe
              </button>
            </>
          )}
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-6">
        {showSelector || !selectedJob ? (
          <JobSelector onSelect={handleSelectJob} />
        ) : (
          <SkillTree
            jobChain={jobChain}
            allocated={allocated}
            onSetLevel={setSkillLevel}
          />
        )}
      </div>
    </div>
  )
}
