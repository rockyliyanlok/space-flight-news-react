import { Link } from 'react-router-dom'

import { Article } from '../../types/article'

type Props = {
  article: Article
}

export const HomeArticle = ({ article }: Props) => (
  <div className="flex flex-col gap-4 py-4 border-b font-mono">
    <Link to={`/article/${article.id}`} preventScrollReset={true}>
      <img
        className="aspect-video object-cover"
        src={article.imageUrl}
        alt={article.title}
      />
      <h2 className="text-2xl">{article.title}</h2>
      <p className="mt-4 text-sm hidden lg:block">{article.summary}</p>
    </Link>
    <p className="text-sm text-gray-400">
      {new Date(article.publishedAt).toLocaleString()}
    </p>
  </div>
)
