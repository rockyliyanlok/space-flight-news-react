import { RocketLaunchIcon } from '@heroicons/react/24/solid'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import type { Article } from '../../types'
import { useFetch } from '../../hooks'

export const ArticlePage = () => {
  const { id } = useParams<{ id: string }>()

  const fetchUrl = useMemo(() => {
    return new URL(`https://api.spaceflightnewsapi.net/v3/articles/${id}`)
  }, [id])
  const { data: article, isLoading } = useFetch<Article>(fetchUrl)

  return (
    <div className="container mx-auto">
      {isLoading || !article ? (
        <RocketLaunchIcon className="mx-auto my-12 h-12 w-12 text-gray-400 animate-bounce" />
      ) : (
        <div className="px-4 lg:px-0">
          <img
            className="mt-4 w-full aspect-video object-cover"
            src={article.imageUrl}
            alt={article.title}
          />
          <p className="mt-2 text-sm text-gray-400">
            {new Date(article.publishedAt).toLocaleString()}
          </p>
          <h2 className="mt-4 text-4xl">{article.title}</h2>
          <p className="mt-4 text-base">{article.summary}</p>
        </div>
      )}
    </div>
  )
}
