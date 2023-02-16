import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'

import type { Article } from '../../types/article'
import { queryAtom } from '../../atoms'

export const Home = () => {
  const [query] = useAtom(queryAtom)
  const [articles, setArticles] = useState<Article[]>([])

  const fetchArticles = async (abortController: AbortController) => {
    try {
      const url = new URL('https://api.spaceflightnewsapi.net/v3/articles')
      url.searchParams.append('_sort', 'publishedAt:DESC')
      if (query.length > 0) {
        url.searchParams.append('_q', query)
      }

      const res = await fetch(url.toString(), {
        signal: abortController.signal,
      })

      setArticles(await res.json())
    } catch (error: unknown) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    const abortController = new AbortController()

    fetchArticles(abortController)

    return () => abortController.abort()
  }, [query])

  return (
    <div className="container flex gap-4 mx-auto px-4">
      <pre className="text-xs whitespace-pre-wrap">
        {JSON.stringify(articles, null, 2)}
      </pre>
    </div>
  )
}
