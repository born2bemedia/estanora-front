import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';
import { join } from 'path';

export async function getPost(slug: string, locale: string) {
  const text = await readFile(
    join(process.cwd(), `src/shared/lib/policy/${locale}`, `${slug}.md`),
    'utf8'
  );
  const {
    content,
    data: { title, last_update },
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
    last_update,
    body,
  };
}

export async function getPostSlugs(locale: string) {
  const files = await readdir(join(process.cwd(), `src/shared/lib/policy/${locale}`));
  return files.filter((file) => file.endsWith('.md')).map((file) => file.slice(0, -'.md'.length));
}
