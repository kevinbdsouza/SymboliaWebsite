import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';
import DOMPurify from 'isomorphic-dompurify';

// Import your articles list to get metadata like the title
import { researchArticles } from '@/data/articles';

export default function ResearchArticle({ title, content }) {
  const router = useRouter();

  // Show a loading state while the page is being generated
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // Sanitize the HTML content before rendering it
  // This is a CRITICAL security step to prevent XSS attacks
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <section className="px-4 sm:px-8 py-16 max-w-3xl mx-auto">
      {/* The 'prose' class from @tailwindcss/typography applies beautiful styling.
        prose-lg makes the font size larger for readability.
        prose-h1:text-ink applies a specific color to h1 tags inside the article.
      */}
      <div
        className="prose prose-lg max-w-none prose-h1:text-ink prose-h2:text-ink"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </section>
  );
}

// This function tells Next.js which pages to build
export async function getStaticPaths() {
  // Get the list of slugs from your articles data
  const paths = researchArticles.map(article => ({
    params: { slug: article.slug },
  }));

  return {
    paths,
    fallback: false, // Any path not returned by getStaticPaths will result in a 404
  };
}

// This function fetches the data for each page at build time
export async function getStaticProps({ params }) {
  const { slug } = params;
  
  // Find the article metadata from your central list
  const article = researchArticles.find(a => a.slug === slug);

  // Construct the full path to the HTML file
  const filePath = path.join(process.cwd(), 'data', `${slug}.html`);
  
  let content;
  try {
    // Read the file content
    content = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    // If the file doesn't exist, handle it gracefully
    return { notFound: true };
  }
  
  // Return the title and HTML content as props to the component
  return {
    props: {
      title: article.title,
      content,
    },
  };
}