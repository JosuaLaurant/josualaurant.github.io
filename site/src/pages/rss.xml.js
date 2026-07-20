import rss from '@astrojs/rss';
import { getPublishedPosts } from '../lib/posts';

export async function GET(context) {
	const posts = await getPublishedPosts();

	return rss({
		title: 'Josua Laurant | 기술 기록',
		description: '개인 개발에서 남긴 기록을 모읍니다. 새 글은 AI가 작성하고 포스팅합니다.',
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: `/posts/${post.id}/`,
		})),
	});
}
