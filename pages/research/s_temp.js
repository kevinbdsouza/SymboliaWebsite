import { useRouter } from 'next/router';
import { useState, useEffect, useCallback, useRef } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import * as cheerio from 'cheerio';
import throttle from 'lodash.throttle';
import TableOfContents from '@/components/TableOfContents';

const createSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

export default function ResearchArticle() {
    const router = useRouter();
    const { slug } = router.query;

    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [toc, setToc] = useState([]);
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
        if (!slug) return;

        fetch(`/${slug}.html`)
            .then(res => res.ok ? res.text() : "<h2>Article not found</h2>")
            .then(html => {
                if (!html) {
                    setContent("<h2>Article not found</h2>");
                    return;
                }
                const $ = cheerio.load(html);
                const articleTitle = $('h1').first().text();
                setTitle(articleTitle);
                const headings = [];
                $('h2, h3').each((_, element) => {
                    const headingElement = $(element);
                    const text = headingElement.text();
                    if (text) {
                        const generatedId = createSlug(text);
                        headingElement.attr('id', generatedId);
                        const level = element.tagName === 'h2' ? 2 : 3;
                        headings.push({ id: generatedId, text, level });
                    }
                });
                const modifiedHtml = $.html();
                const sanitizedContent = DOMPurify.sanitize(modifiedHtml, { ADD_ATTR: ['id'] });
                setToc(headings);
                // On load, set the first heading as active if it exists
                if (headings.length > 0) {
                    setActiveId(headings[0].id);
                }
                setContent(sanitizedContent);
            }).catch(error => {
                console.error("Failed to process article:", error);
                setContent("<h2>An error occurred</h2>");
            });
    }, [slug]);

    // We wrap handleScroll in useCallback for performance optimization.
    const handleScroll = useCallback(() => {
        let closestHeading = { id: '', distance: Infinity };
        const targetLine = 150; // A fixed line on the screen to measure from
        toc.forEach(heading => {
            const element = document.getElementById(heading.id);
            if (element) {
                const distance = Math.abs(element.getBoundingClientRect().top - targetLine);
                if (distance < closestHeading.distance) {
                    closestHeading = { id: heading.id, distance };
                }
            }
        });
        if (closestHeading.id) {
            setActiveId(closestHeading.id);
        }
    }, [toc]);

    useEffect(() => {
        if (toc.length === 0) return;
        // We create a throttled version of our scroll handler
        const throttledScrollHandler = throttle(handleScroll, 150);
        window.addEventListener('scroll', throttledScrollHandler);
        // Cleanup function to remove the listener
        return () => {
            window.removeEventListener('scroll', throttledScrollHandler);
        };
    }, [toc, handleScroll]);


    const handleTocLinkClick = (id) => {
        setActiveId(id);
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -100;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    if (!content) {
        return (
            <div className="text-center py-24"><p>Loading article...</p></div>
        );
    }

    return (
        <section className="px-4 sm:px-8 py-16 max-w-8xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-x-12 lg:items-start">
                {toc.length > 0 && (
                    <div className="lg:w-1/4 lg:sticky lg:top-24 z-10 overflow-y-auto max-h-[calc(100vh-7rem)]">
                       <TableOfContents
                         title={title}
                         toc={toc}
                         activeId={activeId}
                         onLinkClick={handleTocLinkClick}
                       />
                    </div>
                )}
                <div className="flex-1 lg:w-3/4">
                    <div
                        className="prose prose-lg max-w-none prose-h1:text-ink prose-h2:text-ink"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                </div>
            </div>
        </section>
    );
}