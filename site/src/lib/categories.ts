import type { CollectionEntry } from 'astro:content';

export const categories = {
	'blog-building': {
		label: '블로그 만들기',
		description: '글을 쓰고 공개하는 도구와 흐름을 정리합니다.',
	},
	development: {
		label: '개발 기록',
		description: '개발하며 발견한 문제와 해결 과정을 남깁니다.',
	},
	direct: {
		label: '직접 쓴 글',
		description: '그때그때 직접 남긴 생각과 일상의 기록입니다.',
	},
} as const;

export type CategorySlug = keyof typeof categories;

export function getCategory(slug: CategorySlug) {
	return categories[slug];
}

export function getPublishedCategories(posts: CollectionEntry<'blog'>[]) {
	return (Object.keys(categories) as CategorySlug[])
		.map((slug) => ({
			slug,
			...getCategory(slug),
			posts: posts.filter((post) => post.data.category === slug),
		}))
		.filter((category) => category.posts.length > 0);
}
