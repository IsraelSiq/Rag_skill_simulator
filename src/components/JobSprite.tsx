import { useState } from 'react'
import { getJobSpriteUrl } from '@/data/jobSprites'
import type { JobId } from '@/types'
import { JOBS } from '@/data/jobs'

interface Props {
  jobId: JobId
  size?: number
  className?: string
}

export function JobSprite({ jobId, size = 40, className = '' }: Props) {
  const [error, setError] = useState(false)
  const url = getJobSpriteUrl(jobId)
  const job = JOBS.find(j => j.id === jobId)
  const fallback = job?.icon ?? '❓'

  if (!url || error) {
    return (
      <span
        className={`flex items-center justify-center ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.55 }}
        aria-label={job?.name}
      >
        {fallback}
      </span>
    )
  }

  return (
    <img
      src={url}
      alt={job?.name ?? jobId}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={`object-contain ${className}`}
      style={{ imageRendering: 'pixelated', width: size, height: size }}
      onError={() => setError(true)}
    />
  )
}
