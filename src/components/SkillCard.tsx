import { useState, useRef } from 'react'
import type { Skill, AllocatedSkills } from '@/types'

// ─── helpers ──────────────────────────────────────────────────────────────────────────

const ELEMENT_COLOR: Record<string, { text: string; bg: string }> = {
  'Fogo':       { text: 'text-red-400',    bg: 'bg-red-400/10'     },
  'Agua':       { text: 'text-blue-400',   bg: 'bg-blue-400/10'    },
  'Água':       { text: 'text-blue-400',   bg: 'bg-blue-400/10'    },
  'Vento':      { text: 'text-emerald-300',bg: 'bg-emerald-300/10' },
  'Terra':      { text: 'text-amber-400',  bg: 'bg-amber-400/10'   },
  'Sagrado':    { text: 'text-yellow-300', bg: 'bg-yellow-300/10'  },
  'Sombra':     { text: 'text-purple-400', bg: 'bg-purple-400/10'  },
  'Veneno':     { text: 'text-lime-400',   bg: 'bg-lime-400/10'    },
  'Fantasma':   { text: 'text-indigo-300', bg: 'bg-indigo-300/10'  },
  'Neutro':     { text: 'text-rag-muted',  bg: 'bg-rag-surface2'   },
  'Morto-vivo': { text: 'text-rose-400',   bg: 'bg-rose-400/10'    },
}

const TYPE_CONFIG: Record<string, { icon: string; label: string; color: string }> = {
  active:  { icon: '⚡', label: 'Ativa',   color: 'text-rag-accent' },
  passive: { icon: '📘', label: 'Passiva', color: 'text-rag-muted'  },
  toggle:  { icon: '🔄', label: 'Toggle',  color: 'text-rag-gold'   },
}

function isUnlocked(skill: Skill, allocated: AllocatedSkills): boolean {
  if (!skill.requires) return true
  return skill.requires.every(req => (allocated[req.skillId] ?? 0) >= req.level)
}

function getMissingDeps(skill: Skill, allocated: AllocatedSkills) {
  if (!skill.requires) return []
  return skill.requires
    .filter(req => (allocated[req.skillId] ?? 0) < req.level)
    .map(req => ({ skillId: req.skillId, level: req.level }))
}

// ─── barra de nível ───────────────────────────────────────────────────────────────

function LevelBar({ current, max, isMaxed }: { current: number; max: number; isMaxed: boolean }) {
  if (max >= 7) {
    const pct = max === 0 ? 0 : Math.round((current / max) * 100)
    return (
      <div className="w-full h-1.5 bg-rag-faint/30 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-300 ${ isMaxed ? 'bg-rag-gold' : 'bg-rag-accent' }`}
          style={{ width: `${pct}%` }} />
      </div>
    )
  }
  return (
    <div className="flex gap-0.5 w-full">
      {Array.from({ length: max }).map((_, i) => (
        <div key={i} className={`flex-1 h-1.5 rounded-full transition-all duration-150 ${
          i < current ? (isMaxed ? 'bg-rag-gold' : 'bg-rag-accent') : 'bg-rag-faint/30'
        }`} />
      ))}
    </div>
  )
}

// ─── tooltip ────────────────────────────────────────────────────────────────────────

interface TooltipProps {
  skill: Skill
  allocated: AllocatedSkills
  locked: boolean
  anchorRef: React.RefObject<HTMLButtonElement | null>
}

function Tooltip({ skill, allocated, locked, anchorRef }: TooltipProps) {
  const elemStyle = skill.element ? (ELEMENT_COLOR[skill.element] ?? { text: 'text-rag-muted', bg: '' }) : null
  const typeConf  = TYPE_CONFIG[skill.type] ?? TYPE_CONFIG.active

  const openAbove = (() => {
    if (!anchorRef.current) return true
    const rect = anchorRef.current.getBoundingClientRect()
    return rect.top > 220
  })()

  return (
    <div className={`
      absolute ${ openAbove ? 'bottom-full mb-2' : 'top-full mt-2' }
      left-1/2 -translate-x-1/2
      z-50 w-64 bg-rag-surface2 border border-rag-border rounded-xl p-3.5
      shadow-2xl pointer-events-none
      animate-in fade-in-0 zoom-in-95 duration-100
    `}>
      <div className="flex items-center justify-between gap-2 mb-2">
        <p className="font-semibold text-rag-text text-sm leading-tight">{skill.name}</p>
        <span className={`text-xs font-medium shrink-0 ${typeConf.color}`}>
          {typeConf.icon} {typeConf.label}
        </span>
      </div>

      {elemStyle && skill.element && (
        <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2 ${elemStyle.text} ${elemStyle.bg}`}>
          ● {skill.element}
        </span>
      )}

      <p className="text-rag-muted text-xs leading-relaxed mb-2.5">{skill.description}</p>

      {skill.requires && skill.requires.length > 0 && (
        <div className="border-t border-rag-border/60 pt-2 mb-2">
          <p className="text-rag-faint text-xs font-semibold mb-1.5 uppercase tracking-wide">Requer</p>
          {skill.requires.map(req => {
            const met = (allocated[req.skillId] ?? 0) >= req.level
            return (
              <div key={req.skillId} className="flex items-center gap-1.5 mb-1">
                <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-xs shrink-0 ${
                  met ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>{met ? '✓' : '✗'}</span>
                <span className={`text-xs ${ met ? 'text-rag-muted' : 'text-rag-text' }`}>
                  {req.skillId}
                  <span className="text-rag-faint ml-1">Lv.{req.level}</span>
                </span>
              </div>
            )
          })}
        </div>
      )}

      <p className="text-rag-faint text-xs border-t border-rag-border/40 pt-2 mt-1">
        {locked ? '🔒 Habilidade bloqueada — veja os requisitos acima' : 'Clique: +1 · Clique direito: −1'}
      </p>
    </div>
  )
}

// ─── card principal ───────────────────────────────────────────────────────────────────

interface Props {
  skill: Skill
  currentLevel: number
  allocated: AllocatedSkills
  onSetLevel: (skillId: string, level: number) => boolean
}

export function SkillCard({ skill, currentLevel, allocated, onSetLevel }: Props) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [pressed, setPressed]         = useState(false)
  const [blocked, setBlocked]         = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)

  const unlocked = isUnlocked(skill, allocated)
  const isMaxed  = currentLevel >= skill.maxLevel
  const hasLevel = currentLevel > 0
  const locked   = !unlocked && !hasLevel
  const missing  = getMissingDeps(skill, allocated)
  const hasMissing = missing.length > 0

  function triggerBlocked() {
    setBlocked(true)
    setTimeout(() => setBlocked(false), 600)
  }

  function handleAutoAllocate(e: React.MouseEvent) {
    e.stopPropagation()
    missing.forEach(dep => {
      const current = allocated[dep.skillId] ?? 0
      if (current < dep.level) onSetLevel(dep.skillId, dep.level)
    })
  }

  function handleClick() {
    if (locked) return
    if (isMaxed) {
      onSetLevel(skill.id, 0)
    } else {
      const ok = onSetLevel(skill.id, currentLevel + 1)
      if (!ok) triggerBlocked()
    }
    if (!blocked) {
      setPressed(true)
      setTimeout(() => setPressed(false), 120)
    }
  }

  function handleRightClick(e: React.MouseEvent) {
    e.preventDefault()
    if (locked) return
    if (currentLevel > 0) {
      onSetLevel(skill.id, currentLevel - 1)
      setPressed(true)
      setTimeout(() => setPressed(false), 120)
    }
  }

  const cardStyle = blocked
    ? 'border-red-500/50 bg-red-500/8 shadow-sm shadow-red-500/10'
    : locked
    ? 'opacity-40 border-rag-border bg-rag-surface cursor-not-allowed'
    : isMaxed
    ? 'border-rag-gold/60 bg-rag-gold/8 shadow-sm'
    : hasLevel
    ? 'border-rag-accent/50 bg-rag-accent/8'
    : 'border-rag-border bg-rag-surface hover:border-rag-muted/50 hover:bg-rag-surface2'

  const elemStyle = skill.element ? (ELEMENT_COLOR[skill.element] ?? null) : null

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button
        ref={btnRef}
        onClick={handleClick}
        onContextMenu={handleRightClick}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        aria-label={`${skill.name} — nível ${currentLevel} de ${skill.maxLevel}`}
        className={`
          w-full flex flex-col gap-1.5 p-3 rounded-xl border text-left
          transition-all duration-150
          ${ pressed && !blocked ? 'scale-95' : 'scale-100' }
          ${ blocked ? 'animate-[wiggle_0.3s_ease-in-out]' : '' }
          ${ cardStyle }
        `}
      >
        <div className="flex items-start justify-between gap-1">
          <span className={`text-xs font-semibold leading-tight ${
            blocked ? 'text-red-400' : isMaxed ? 'text-rag-gold' : hasLevel ? 'text-rag-text' : 'text-rag-muted'
          }`}>
            {skill.name}
          </span>
          <div className="flex items-center gap-1 shrink-0">
            {hasMissing && (
              <button
                onClick={handleAutoAllocate}
                title="Alocar dependências"
                className="text-xs leading-none text-rag-accent hover:text-rag-accent/70
                           bg-rag-accent/10 hover:bg-rag-accent/20 rounded px-1 py-px
                           transition-all duration-150 cursor-pointer"
              >
                ⚡
              </button>
            )}
            <span className="text-xs leading-none opacity-70">
              {TYPE_CONFIG[skill.type]?.icon ?? '⚡'}
            </span>
          </div>
        </div>

        {elemStyle && skill.element && (
          <span className={`text-xs font-medium w-fit px-1.5 py-px rounded-md ${elemStyle.text} ${elemStyle.bg}`}>
            {skill.element}
          </span>
        )}

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          <div className="flex-1">
            <LevelBar current={currentLevel} max={skill.maxLevel} isMaxed={isMaxed} />
          </div>
          <span className={`text-xs font-bold tabular-nums shrink-0 ${
            blocked ? 'text-red-400' : isMaxed ? 'text-rag-gold' : hasLevel ? 'text-rag-accent' : 'text-rag-faint'
          }`}>
            {currentLevel}/{skill.maxLevel}
          </span>
        </div>
      </button>

      {showTooltip && (
        <Tooltip
          skill={skill}
          allocated={allocated}
          locked={locked}
          anchorRef={btnRef}
        />
      )}
    </div>
  )
}
