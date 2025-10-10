import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/projects',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().url().optional(),
    repository: z.string().url().optional(),
    featured: z.boolean().optional().default(false),
    techs: z.array(z.string()).optional(),
    image: z.string().optional(),
  }),
});

const experience = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/experience',
  }),
  schema: z.object({
    title: z.string(),
    logo: z.string().optional(),
    description: z.array(z.string()),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    current: z.boolean().optional().default(false),
  }),
});

const education = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/education',
  }),
  schema: z.object({
    title: z.string(),
    logo: z.string().optional(),
    description: z.array(z.string()),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    current: z.boolean().optional().default(false),
  }),
});

const site = defineCollection({
  loader: file('./src/content/site/config.json'),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    introduction: z.string(),
    description: z.string(),
    avatar: z.string(),
    socialLinks: z
      .array(
        z.object({
          platform: z.string(),
          url: z.string(),
        })
      )
      .optional(),
  }),
});

export const collections = {
  projects,
  experience,
  education,
  site,
};
