import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import DOMPurify from 'isomorphic-dompurify';

export default function ResearchArticle() {
    const router = useRouter();
    const { slug } = router.query;
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (slug) {
            // Assuming you have a way to get the title from the slug
            const formattedTitle = slug.replace(/-/g, ' ');
            setTitle(formattedTitle);

            // Fetch the content from the public folder
            fetch(`/${slug}.html`)
                .then((res) => res.text())
                .then((html) => {
                    const sanitizedContent = DOMPurify.sanitize(html);
                    setContent(sanitizedContent);
                });
        }
    }, [slug]);

    if (!content) {
        return null;
    }

    return (
        <section className="px-4 sm:px-8 py-16 max-w-3xl mx-auto">
            <div
                className="prose prose-lg max-w-none prose-h1:text-ink prose-h2:text-ink"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </section>
    );
}