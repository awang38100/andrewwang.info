import { getCollection } from 'astro:content';

const statusOrder = ['active', 'maintained', 'completed', 'archived'];

/** All projects, sorted by status (active first) then name. */
export async function getProjects() {
  const projects = await getCollection('projects');
  return projects.sort(
    (a, b) =>
      statusOrder.indexOf(a.data.status) - statusOrder.indexOf(b.data.status) ||
      a.data.name.localeCompare(b.data.name),
  );
}
