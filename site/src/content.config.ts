import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string().min(1),
		description: z.string().min(1),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		draft: z.boolean().default(false),
		category: z.enum(['blog-building', 'development', 'direct']),
		writing: z.enum(['ai-authored', 'direct']),
		summary: z.enum(['ai-generated', 'direct']),
		tags: z.array(z.string().min(1)).default([]),
		series: z.string().min(1).optional(),
	}),
});

const updates = defineCollection({
	loader: glob({ base: './src/content/updates', pattern: '**/*.md' }),
	schema: z.object({
		version: z.string().regex(/^v\d+\.\d+\.\d+$/),
		title: z.string().min(1),
		pubDate: z.coerce.date(),
		draft: z.boolean().default(false),
		changes: z.array(z.string().min(1)).min(1),
	}),
});

export const collections = { blog, updates };
