import { Article } from '../../types/article'

type Props = {
  article: Article
}

export const HomeArticle = ({ article }: Props) => (
  <div className="flex flex-col gap-4 py-4 border-b font-mono">
    <img
      className="aspect-video object-cover"
      src={article.imageUrl}
      alt={article.title}
    />
    <h2 className="text-2xl">{article.title}</h2>
    <p className="text-sm hidden lg:block">{article.summary}</p>
    <p className="text-sm text-gray-400">
      {new Date(article.publishedAt).toLocaleString()}
    </p>
  </div>
)
