import { useState, useEffect } from 'react'

const useFetch = (fetchFn, deps = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    queueMicrotask(() => {
      setLoading(true)
      setData(null)
      setError(null)
    })
    fetchFn()
      .then(res => setData(res.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, deps)

  return { data, loading, error }
}

export default useFetch
