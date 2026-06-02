import { useState } from 'react'
import { JOBS, getJobChildren } from '@/data/jobs'
import type { JobId } from '@/types'

const TIER_LABELS: Record<number, string> = {
  1: '1ª Classe',
  2: '2ª Classe',
  3: 'Transcendente',
  4: '3ª / 4ª Classe',
}

const BASE_CLASSES: JobId[] = ['swordman', 'mage', 'archer', 'merchant', 'thief', 'acolyte']

interface Props {
  onSelect: (id: JobId) => void
}

export function JobSelector({ onSelect }: Props) {
  const [hovered, setHovered] = useState<JobId | null>(null)

  // Monta a árvore de progressão: mostra só os caminhos válidos
  function renderTree(jobId: JobId, depth = 0): React.ReactNode {
    const job = JOBS.find(j => j.id === jobId)!
    const children = getJobChildren(jobId)

    return (
      <div key={jobId} className="flex flex-col items-center">
        <button
          onClick={() => onSelect(jobId)}
          onMouseEnter={() => setHovered(jobId)}
          onMouseLeave={() => setHovered(null)}
          className={`
            relative flex flex-col items-center gap-1 px-3 py-2.5 rounded-xl border transition-all
            ${ hovered === jobId
              ? 'border-rag-gold bg-rag-gold/10 text-rag-gold scale-105'
              : 'border-rag-border bg-rag-surface2 text-rag-muted hover:text-rag-text'
            }
          `}
          style={{ minWidth: 90 }}
        >
          <span className="text-2xl">{job.icon}</span>
          <span className="text-xs font-semibold text-center leading-tight">{job.name}</span>
        </button>

        {children.length > 0 && (
          <>
            <div className="w-px h-4 bg-rag-border" />
            <div className="flex gap-4">
              {children.map(child => (
                <div key={child.id} className="flex flex-col items-center">
                  <div className="w-px h-4 bg-rag-border" />
                  {renderTree(child.id, depth + 1)}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h2 className="font-display text-2xl font-bold text-rag-text mb-1">Escolha sua Classe</h2>
        <p className="text-rag-muted text-sm">Selecione qualquer classe para ver e simular suas skills</p>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="flex gap-12 justify-center flex-wrap">
          {BASE_CLASSES.map(baseId => (
            <div key={baseId} className="flex flex-col items-center">
              {renderTree(baseId)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
