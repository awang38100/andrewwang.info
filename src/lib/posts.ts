import { getCollection } from 'astro:content';

/** Published posts, newest first. Drafts are included in dev but excluded from production builds. */
export async function getPosts() {
  const posts = await getCollection('writing', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
