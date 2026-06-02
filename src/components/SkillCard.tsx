import { useState } from 'react'
import type { Skill, AllocatedSkills } from '@/types'
import { findSkill } from '@/data/skills'

const ELEMENT_COLOR: Record<string, string> = {
  'Fogo':       'text-red-400',
  'Água':       'text-blue-400',
  'Vento':      'text-green-300',
  'Terra':      'text-amber-400',
  'Sagrado':    'text-yellow-300',
  'Sombra':     'text-purple-400',
  'Veneno':     'text-lime-400',
  'Fantasma':   'text-indigo-300',
  'Morto-vivo': 'text-rose-400',
}

const TYPE_ICON: Record<string, string> = {
  active:  '⚡',
  passive: '📘',
  toggle:  '🔄',
}

function isUnlocked(skill: Skill, allocated: AllocatedSkills): boolean {
  if (!skill.requires) return true
  return skill.requires.every(req => (allocated[req.skillId] ?? 0) >= req.level)
}

function getMissingDeps(skill: Skill, allocated: AllocatedSkills): string[] {
  if (!skill.requires) return []
  return skill.requires
    .filter(req => (allocated[req.skillId] ?? 0) < req.level)
    .map(req => {
      const dep = findSkill(req.skillId)
      return `${dep?.name ?? req.skillId} Lv.${req.level}`
    })
}

interface Props {
  skill: Skill
  currentLevel: number
  allocated: AllocatedSkills
  onSetLevel: (skillId: string, level: number) => void
}

export function SkillCard({ skill, currentLevel, allocated, onSetLevel }: Props) {
  const [showTooltip, setShowTooltip] = useState(false)
  const unlocked = isUnlocked(skill, allocated)
  const missing = getMissingDeps(skill, allocated)
  const isMaxed = currentLevel >= skill.maxLevel

  function handleClick() {
    if (isMaxed) {
      onSetLevel(skill.id, 0) // reset ao clicar no máximo
    } else {
      onSetLevel(skill.id, currentLevel + 1) // auto-aloca deps
    }
  }

  function handleRightClick(e: React.MouseEvent) {
    e.preventDefault()
    if (currentLevel > 0) onSetLevel(skill.id, currentLevel - 1)
  }

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        onContextMenu={handleRightClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`
          w-full flex flex-col gap-1.5 p-3 rounded-xl border text-left transition-all
          ${ !unlocked && currentLevel === 0
            ? 'opacity-40 border-rag-border bg-rag-surface cursor-not-allowed'
            : isMaxed
            ? 'border-rag-gold/60 bg-rag-gold/10 text-rag-gold'
            : currentLevel > 0
            ? 'border-rag-accent/50 bg-rag-accent/10'
            : 'border-rag-border bg-rag-surface hover:border-rag-muted hover:bg-rag-surface2'
          }
        `}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-1">
          <span className="text-xs font-semibold text-rag-text leading-tight">{skill.name}</span>
          <span className="text-xs shrink-0">{TYPE_ICON[skill.type]}</span>
        </div>

        {/* Elemento */}
        {skill.element && (
          <span className={`text-xs font-medium ${ELEMENT_COLOR[skill.element] ?? 'text-rag-muted'}`}>
            {skill.element}
          </span>
        )}

        {/* Nível */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex gap-0.5">
            {Array.from({ length: skill.maxLevel }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full ${
                  i < currentLevel ? (isMaxed ? 'bg-rag-gold' : 'bg-rag-accent') : 'bg-rag-faint'
                }`}
                style={{ width: Math.max(4, Math.floor(64 / skill.maxLevel)) }}
              />
            ))}
          </div>
          <span className={`text-xs font-bold tabular-nums ${
            isMaxed ? 'text-rag-gold' : currentLevel > 0 ? 'text-rag-accent' : 'text-rag-faint'
          }`}>
            {currentLevel}/{skill.maxLevel}
          </span>
        </div>
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-0 mb-2 z-50 w-64 bg-rag-surface2 border border-rag-border rounded-xl p-3 shadow-2xl pointer-events-none">
          <p className="font-semibold text-rag-text text-sm mb-1">{skill.name}</p>
          {skill.element && (
            <p className={`text-xs mb-1 ${ELEMENT_COLOR[skill.element] ?? 'text-rag-muted'}`}>
              Elemento: {skill.element}
            </p>
          )}
          <p className="text-rag-muted text-xs leading-relaxed mb-2">{skill.description}</p>
          {skill.requires && skill.requires.length > 0 && (
            <div className="border-t border-rag-border pt-2">
              <p className="text-rag-muted text-xs font-semibold mb-1">Requer:</p>
              {skill.requires.map(req => {
                const dep = findSkill(req.skillId)
                const met = (allocated[req.skillId] ?? 0) >= req.level
                return (
                  <p key={req.skillId} className={`text-xs ${met ? 'text-rag-green' : 'text-rag-accent'}`}>
                    {met ? '✓' : '✗'} {dep?.name ?? req.skillId} Lv.{req.level}
                  </p>
                )
              })}
            </div>
          )}
          {missing.length > 0 && (
            <p className="text-rag-accent text-xs mt-1">
              ⚡ Auto-aloca: {missing.join(', ')}
            </p>
          )}
          <p className="text-rag-faint text-xs mt-2">
            Clique: +1 nível · Clique direito: -1 nível
          </p>
        </div>
      )}
    </div>
  )
}
