import { api } from 'src/boot/axios';
import {
  ArticleUpdate,
  ArticleYear,
  Articles,
  articleUpdateSchema,
  articlesSchema,
} from 'src/components/models';

export default function useArticleService() {
  const ROOT = 'articles';

  async function getAll(): Promise<Articles> {
    try {
      const response = await api.get(ROOT);
      const articles = articlesSchema.parse(response.data);
      return articles;
    } catch (error) {
      console.error('Error fetching articles:', error);
      return [];
    }
  }

  async function getByYear(article_year: ArticleYear): Promise<Articles> {
    try {
      const response = await api.get(
        `${ROOT}/${articlesSchema.parse(article_year)}`
      );
      const articles = articlesSchema.parse(response.data);
      return articles;
    } catch (error) {
      console.error('Error fetching articles by year:', error);
      return [];
    }
  }

  async function post(article: ArticleUpdate): Promise<number | null> {
    try {
      const response = await api.post(
        `${ROOT}`,
        articleUpdateSchema.parse(article)
      );
      return response.status;
    } catch (error) {
      console.error('Error posting article:', error);
      return null;
    }
  }

  async function put(
    article_id: number,
    articleUpdate: ArticleUpdate
  ): Promise<number | null> {
    try {
      const response = await api.put(
        `${ROOT}/${article_id}`,
        articleUpdateSchema.parse(articleUpdate)
      );
      return response.status;
    } catch (error) {
      console.error('Error updating article:', error);
      return null;
    }
  }

  async function remove(article_id: number): Promise<number | null> {
    try {
      const response = await api.delete(`${ROOT}/${article_id}`);
      return response.status;
    } catch (error) {
      console.error('Error deleting article:', error);
      return null;
    }
  }

  return {
    getAll,
    getByYear,
    post,
    put,
    remove,
  };
}
