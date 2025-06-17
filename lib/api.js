import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), 'pages/content');

export function getPostSlugs() {
  // We only want to get files that end with .html
  return fs.readdirSync(postsDirectory).filter(file => file.endsWith('.html'));
}

export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.html$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.html`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  // gray-matter can parse front-matter from any text file, including .html
  const { data, content } = matter(fileContents);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
