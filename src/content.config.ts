import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const writing = defineCollection({
  loader: glob({ base: './src/content/writing', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      description: z.string(),
      draft: z.boolean().default(false),
      /** Header image shown above the post and used as its social preview. Path is relative to the .md file. */
      cover: image().optional(),
      coverAlt: z.string().optional(),
    }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    name: z.string(),
    summary: z.string(),
    link: z.url().optional(),
    status: z.enum(['active', 'maintained', 'completed', 'archived']),
    draft: z.boolean().default(false),
  }),
});

export const collections = { writing, projects };
