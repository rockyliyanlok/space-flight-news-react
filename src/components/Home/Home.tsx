import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { RocketLaunchIcon } from '@heroicons/react/24/solid'

import type { Article } from '../../types/article'
import { HomeArticle } from './HomeArticle'
import { queryAtom } from '../../atoms'

export const Home = () => {
  const [query] = useAtom(queryAtom)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [articles, setArticles] = useState<Article[]>([])

  const fetchArticles = async (abortController: AbortController) => {
    try {
      setIsFetching(true)

      const url = new URL('https://api.spaceflightnewsapi.net/v3/articles')
      url.searchParams.append('_sort', 'publishedAt:DESC')
      url.searchParams.append('_limit', '18')
      if (query.length > 0) {
        url.searchParams.append('_q', query)
      }

      const res = await fetch(url.toString(), {
        signal: abortController.signal,
      })

      setIsFetching(false)
      setArticles(await res.json())
    } catch (error: unknown) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error(error)
      }
      setIsFetching(false)
    }
  }

  useEffect(() => {
    const abortController = new AbortController()

    fetchArticles(abortController)

    return () => abortController.abort()
  }, [query])

  return (
    <div className="container mx-auto">
      {isFetching ? (
        <RocketLaunchIcon className="mx-auto my-12 h-12 w-12 text-gray-400 animate-bounce" />
      ) : (
        <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.isArray(articles) &&
            articles.length > 0 &&
            articles.map((article) => <HomeArticle key={`kArticle-${article.id}`} article={article} />)}
        </div>
      )}
    </div>
  )
}
