import { useEffect, useState } from 'react'
import { fetchJobs, mapJob, type ApiJob } from '@/lib/api'
import type { JobId } from '@/types'

export interface JobSummary {
  id: JobId
  name: string
  tier: 1 | 2 | 3 | 4 | 5
  parent?: JobId
  maxSkillPoints: number
  icon?: string
}

function toJobSummary(raw: ApiJob): JobSummary {
  return {
    ...mapJob(raw),
    icon: raw.icon ?? undefined,
  }
}

interface UseJobsResult {
  data: JobSummary[]
  loading: boolean
  error: string | null
}

export function useJobs(): UseJobsResult {
  const [data, setData] = useState<JobSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchJobs()
      .then((raw) => {
        if (!cancelled) setData(raw.map(toJobSummary))
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [])

  return { data, loading, error }
}
