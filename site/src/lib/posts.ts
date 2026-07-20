import { getCollection } from 'astro:content';

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
