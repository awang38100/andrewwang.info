// Site-wide settings. Replace the TODO placeholders with your own details.

export const SITE_TITLE = 'Andrew Wang';
export const SITE_DESCRIPTION = 'Andrew Wang works on AI products and solutions at Citadel in New York.';

export const AUTHOR = {
  name: 'Andrew Wang',
  email: 'andrew.tj.wang@gmail.com',
};

/** Shown in the sidebar on every page. Drop your photo in public/ and point this at it. */
export const HEADSHOT = '/headshot.jpg';

/** Shown top-right on every page. Add, remove, or reorder freely. */
export const SOCIAL_LINKS = [
  { label: 'X', href: 'https://x.com/andrewwang0' },
  { label: 'GitHub', href: 'https://github.com/awang38100' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/andrewwang0/' },
  { label: 'Email', href: `mailto:${AUTHOR.email}` },
];

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/writing/', label: 'Writing' },
  { href: '/projects/', label: 'Projects' },
];
