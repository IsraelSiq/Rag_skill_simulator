import { useEffect, useState } from 'react'
import { fetchSkillsByJob } from '@/lib/api'
import type { Skill } from '@/types'

interface UseSkillsResult {
  data: Skill[]
  loading: boolean
  error: string | null
}

export function useSkills(jobId: string | null): UseSkillsResult {
  const [data, setData] = useState<Skill[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!jobId) {
      setData([])
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    fetchSkillsByJob(jobId)
      .then((skills) => {
        if (!cancelled) setData(skills)
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [jobId])

  return { data, loading, error }
}
