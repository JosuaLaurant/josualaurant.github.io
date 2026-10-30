import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
	schema: z
		.object({
			title: z.string().min(1),
			description: z.string().min(1),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			// 공개 후 고친 내용. 글 끝의 '고친 기록'에 보이고, 가장 최근 날짜가 updatedDate와 같아야 한다.
			revisions: z.array(z.object({ date: z.coerce.date(), note: z.string().min(1) })).default([]),
			draft: z.boolean().default(false),
			category: z.enum(['blog-building', 'development', 'direct']),
			writing: z.enum(['ai-authored', 'direct']),
			summary: z.enum(['ai-generated', 'direct']),
			tags: z.array(z.string().min(1)).default([]),
			series: z.string().min(1).optional(),
		})
		.superRefine((post, context) => {
			if (post.revisions.length === 0) return;
			const day = (date: Date) => date.toISOString().slice(0, 10);
			const latest = post.revisions.map((revision) => day(revision.date)).sort().at(-1);
			if (!post.updatedDate || day(post.updatedDate) !== latest) {
				context.addIssue({ code: 'custom', path: ['updatedDate'], message: `updatedDate는 가장 최근 고친 날짜(${latest})와 같아야 합니다.` });
			}
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
