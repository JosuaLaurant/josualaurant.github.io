import { getCollection, type CollectionEntry } from 'astro:content';

export async function getPublishedPosts() {
	return (await getCollection('blog'))
		.filter((post) => !post.data.draft)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function formatDate(date: Date) {
	return new Intl.DateTimeFormat('ko-KR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}).format(date);
}

export function getPostNeighbors(posts: CollectionEntry<'blog'>[], id: string) {
	const index = posts.findIndex((post) => post.id === id);
	return {
		newer: index > 0 ? posts[index - 1] : undefined,
		older: index >= 0 && index < posts.length - 1 ? posts[index + 1] : undefined,
	};
}

export function getPostNumbers(posts: CollectionEntry<'blog'>[]) {
	const chronological = [...posts].sort((a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf() || a.id.localeCompare(b.id));
	return new Map(chronological.map((post, index) => [post.id, index + 1]));
}
