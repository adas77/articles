import { z } from 'zod';

export const date_yyyy_mm_dd_schema = z
  .string()
  .refine(
    (data) => {
      const formatted = data.replace(/\//g, '-');
      return /^\d{4}-\d{2}-\d{2}$/.test(formatted);
    },
    {
      message: 'Date must be in YYYY-MM-DD format',
    }
  )
  .transform((data) => {
    const formatted = data.replace(/\//g, '-');
    const parsedDate = new Date(formatted);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });
export const articleSchema = z.object({
  article_id: z.number(),
  content: z.string(),
  release_date: date_yyyy_mm_dd_schema,
  title: z.string(),
});
export const articleUpdateSchema = z.object({
  content: z.string().min(1),
  release_date: date_yyyy_mm_dd_schema,
  title: z.string().min(1),
});
export const articlesSchema = z.array(articleSchema);
export const articleYear = z.string().regex(/^\d{4}$/);

export type Article = z.infer<typeof articleSchema>;
export type ArticleUpdate = z.infer<typeof articleUpdateSchema>;
export type Articles = z.infer<typeof articlesSchema>;
export type ArticleYear = z.infer<typeof articleYear>;
