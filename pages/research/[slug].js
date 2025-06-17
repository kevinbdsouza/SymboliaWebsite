import fs from 'fs';
import { join } from 'path';
import { useEffect, useRef, useState } from 'react';
import { researchArticles } from '@/lib/researchArticles';

export default function ResearchArticle({ slug, html }) {
  const articleRef = useRef(null);
  const [toc, setToc] = useState([]);
  const article = researchArticles.find((a) => a.slug === slug);

  useEffect(() => {
    const container = articleRef.current;
    if (!container) return;

    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const items = [];

    headings.forEach((h) => {
      const level = parseInt(h.tagName[1]);
      let id = h.id;
      if (!id) {
        id = h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        h.id = id;
      }
      h.classList.add('cursor-pointer');
      h.addEventListener('click', () => {
        let next = h.nextElementSibling;
        while (next && !/^H[1-6]$/.test(next.tagName)) {
          next.classList.toggle('hidden');
          next = next.nextElementSibling;
        }
      });
      items.push({ id, text: h.textContent, level });
    });

    setToc(items);
  }, [html]);

  if (!article) return null;

  return (
    <section className="px-4 sm:px-8 py-16 max-w-3xl mx-auto">
      <h1 className="font-serif text-4xl md:text-5xl text-ink mb-6 text-center">
        {article.title}
      </h1>

      {toc.length > 0 && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow">
          <h2 className="font-serif text-2xl mb-4">Table of Contents</h2>
          <ul className="list-disc pl-5 space-y-2">
            {toc.map((item) => (
              <li key={item.id} className={`ml-${(item.level - 1) * 4}`}>
                <a href={`#${item.id}`} className="text-primary hover:underline">
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <article
        ref={articleRef}
        className="prose prose-ink max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}

export async function getStaticPaths() {
  const contentDir = join(process.cwd(), 'pages/content');
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.html'));
  return {
    paths: files.map((f) => ({ params: { slug: f.replace(/\.html$/, '') } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const contentDir = join(process.cwd(), 'pages/content');
  const fullPath = join(contentDir, `${slug}.html`);
  let html = fs.readFileSync(fullPath, 'utf8');
  const match = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (match) {
    html = match[1];
  }
  return {
    props: { slug, html },
  };
}
