import { getCollection } from 'astro:content';

const statusOrder = ['active', 'maintained', 'completed', 'archived'];

/** Published projects, sorted by status (active first) then name. Drafts are included in dev but excluded from production builds. */
export async function getProjects() {
  const projects = await getCollection('projects', ({ data }) => import.meta.env.DEV || !data.draft);
  return projects.sort(
    (a, b) =>
      statusOrder.indexOf(a.data.status) - statusOrder.indexOf(b.data.status) ||
      a.data.name.localeCompare(b.data.name),
  );
}
