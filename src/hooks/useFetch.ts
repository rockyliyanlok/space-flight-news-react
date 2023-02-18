import { useEffect, useState } from 'react'

export const useFetch = <T extends any>(
  url: URL
): { data: T | undefined; isLoading: boolean; error: Error | undefined } => {
  const [state, setState] = useState<{
    data: T | undefined
    isLoading: boolean
    error: Error | undefined
  }>({
    data: undefined,
    isLoading: true,
    error: undefined,
  })

  const fetchData = async (abortController: AbortController) => {
    try {
      setState((prevState) => ({
        ...prevState,
        isLoading: true,
      }))

      const res = await fetch(url.toString(), {
        signal: abortController.signal,
      })
      const data = await res.json()

      setState((prevState) => ({
        ...prevState,
        data,
        isLoading: false,
      }))
    } catch (error: unknown) {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        error:
          error instanceof Error
            ? error.name !== 'AbortError'
              ? (error as Error)
              : undefined
            : new Error('Unknown error'),
      }))
    }
  }

  useEffect(() => {
    const abortController = new AbortController()

    fetchData(abortController)

    return () => abortController.abort()
  }, [url.toString()])

  return state
}
