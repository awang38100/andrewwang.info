# andrewwang.info

Personal website built with [Astro](https://astro.build) (static output, TypeScript, no UI framework). Hosted on GitHub Pages at https://andrewwang.info and deployed by GitHub Actions.

## Commands

| Command           | What it does                                                  |
| ----------------- | ------------------------------------------------------------- |
| `npm install`     | Install dependencies (Node >= 22.23.4)                        |
| `npm run dev`     | Dev server at http://localhost:4321 (drafts are visible here) |
| `npm run build`   | Type-check with `astro check`, then build to `dist/`          |
| `npm run preview` | Serve the built `dist/` locally                               |

`npm run build` must pass with 0 errors before pushing, because CI runs the same command.

## Structure

```
astro.config.mjs          site URL, sitemap integration, Shiki light/dark themes
src/
  consts.ts               site title, description, email, headshot path, social links, nav
  content.config.ts       content collection schemas (writing, projects)
  content/
    writing/*.md          blog posts; the filename is the URL slug
    projects/*.md         projects (frontmatter only, the body isn't rendered)
  lib/posts.ts            getPosts(): sorted posts, drafts filtered out in production
  lib/projects.ts         getProjects(): projects sorted by status then name
  layouts/BaseLayout.astro  <head> meta/Open Graph, sidebar (name, headshot, nav), social links, footer
  components/             PostList, ProjectList, FormattedDate
  pages/
    index.astro           home: bio (doubles as the About page), 3 projects, 5 most recent posts
    writing/index.astro   all posts
    writing/[...slug].astro  individual post page
    projects/index.astro  projects, sorted by status then name
    rss.xml.ts            RSS feed for writing (/rss.xml)
    404.astro
  styles/global.css       design tokens (light + dark via prefers-color-scheme), typography, sidebar layout, list styles
public/                   copied as-is: CNAME, favicon.svg, headshot.jpg, robots.txt
.github/workflows/deploy.yml  build with withastro/action, deploy with actions/deploy-pages
```

## Adding a post

Create `src/content/writing/<slug>.md`. It will be served at `/writing/<slug>/`.

```md
---
title: My post title
date: 2026-11-08
description: One-sentence summary, used for the meta description, OG tags, and RSS.
draft: false # optional, defaults to false. Drafts show in dev only.
---

Post body in Markdown.
```

The post shows up on the writing index, on the home page (if it's one of the 5 newest), in the RSS feed, and in the sitemap automatically.

## Adding a project

Create `src/content/projects/<anything>.md`:

```md
---
name: Project name
summary: One or two sentences about the project.
link: https://github.com/you/project # optional, must be a full URL
status: active # one of: active | maintained | completed | archived
draft: false # optional, defaults to false. Drafts show in dev only.
---
```

## Empty sections

The Writing and Projects sections hide themselves until something is published (non-draft). Their nav links, home-page sections, and the footer RSS link disappear, and their index pages get `noindex`. The sample post and placeholder projects are kept as drafts, so they still show in `npm run dev` as examples. Publishing the first real post or project brings everything back automatically.

## Layout

Two columns: a 230px sidebar (name, headshot, nav) beside the content column, max width 1000px. Social links sit top-right of the content column. At 640px and below the sidebar stacks above the content, centered, and inner pages hide the headshot. Font is Source Sans 3 from Google Fonts at an 18px base.

The headshot is `public/headshot.jpg` (4:5 portrait). To swap it, replace that file or point `HEADSHOT` in `src/consts.ts` at a new one.

## Conventions

- Keep it static and JS-free. Pages ship zero client-side JavaScript today, so don't add a UI framework or client scripts unless a feature truly needs one.
- Colors come from CSS variables in `src/styles/global.css`. Use `var(--text)`, `var(--muted)`, `var(--border)`, `var(--surface)` rather than hard-coded colors so dark mode keeps working.
- Writing and project lists share the `.item-list` / `.item-title` / `.item-meta` styles, and home-page section titles use `.section-heading`.
- Internal links use trailing slashes (`/writing/`) to match the directory-style build output.
- Every page should use `BaseLayout` and pass `title` and `description`. Pass `image` (PNG/JPG, ~1200x630) to add an `og:image`.
- Frontmatter is validated by Zod schemas in `src/content.config.ts`. Change the schema there when adding fields.
- TypeScript is pinned to 6.x because `@astrojs/check` doesn't support TS 7 yet.

## Deployment

Pushing to `main` (or running the workflow manually) builds and deploys to GitHub Pages. One-time repo setup:

1. Settings → Pages → Source: **GitHub Actions**.
2. Settings → Pages → Custom domain: `andrewwang.info` (with DNS pointing at GitHub Pages). `public/CNAME` also contains the domain.
