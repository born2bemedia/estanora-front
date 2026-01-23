import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';
import { join } from 'path';

export async function getPost(slug: string, locale: string) {
  const text = await readFile(
    join(process.cwd(), `src/shared/lib/insights/${locale}`, `${slug}.md`),
    'utf8'
  );
  const {
    content,
    data: { title, subtitle, date, image, seo_title, seo_description, next, excerpt_1, excerpt_2 },
  } = matter(text);

  const renderer = new marked.Renderer();
  renderer.heading = function ({ tokens, depth }: { tokens: unknown; depth: number }) {
    const text = (tokens as Array<{ text: string }>)[0].text;
    const level = depth;

    if (level === 2) {
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return `<h2 id="${id}">${text}</h2>\n`;
    }
    return `<h${level}>${text}</h${level}>`;
  };

  const body = marked(content, { renderer });
  return {
    slug,
    title,
    subtitle,
    date,
    body,
    image,
    seo_title,
    seo_description,
    next,
    excerpt_1,
    excerpt_2,
  };
}

export async function getPostSlugs(locale: string) {
  const files = await readdir(join(process.cwd(), `src/shared/lib/insights/${locale}`));
  return files.filter((file) => file.endsWith('.md')).map((file) => file.slice(0, -'.md'.length));
}
