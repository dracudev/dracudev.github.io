import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

const projects = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/projects",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().url().optional(),
    repository: z.string().url().optional(),
    featured: z.boolean().optional().default(false),
    techs: z.array(z.string()).optional(),
  }),
});

const site = defineCollection({
  loader: file("./src/content/site/config.json"),
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
  site,
};
