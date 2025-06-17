import { getPostBySlug, getAllPosts } from '@/lib/api';
import { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

// This component will render a single heading in the table of contents.
const TocEntry = ({ heading, isVisible, scrollTo }) => (
    <a
        href={`#${heading.slug}`}
        onClick={(e) => {
            e.preventDefault();
            scrollTo(heading.slug);
        }}
        className={`block ml-${(heading.level - 1) * 4} py-1 text-sm ${
      isVisible ? 'text-accent font-semibold' : 'text-gray-500 hover:text-ink'
    } transition-all duration-200`}
    >
        {heading.text}
    </a>
);

// This component renders a collapsible section of the article.
const CollapsibleSection = ({ heading, children }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div id={heading.slug} className="mb-8 scroll-mt-24">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center w-full text-left font-serif text-2xl lg:text-3xl text-ink mb-4 focus:outline-none"
            >
                {isOpen ? <ChevronDown className="mr-2" /> : <ChevronRight className="mr-2" />}
                {heading.text}
            </button>
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-none' : 'max-h-0'
        }`}
            >
                <div className="prose lg:prose-xl max-w-none font-sans text-gray-800 leading-relaxed pl-8">
                    {children}
                </div>
            </div>
        </div>
    );
};


export default function ResearchArticle({ post }) {
    const [activeHeading, setActiveHeading] = useState('');

    // This effect will track which heading is currently visible in the viewport.
    useEffect(() => {
        // Ensure post.headings exists before trying to use it
        if (!post || !post.headings) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveHeading(entry.target.id);
                    }
                });
            },
            { rootMargin: '0px 0px -80% 0px' }
        );

        post.headings.forEach((heading) => {
            const el = document.getElementById(heading.slug);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [post]); // Depend on the whole post object for safety

    // Function to smoothly scroll to a heading.
    const scrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
            window.history.pushState(null, '', `#${id}`);
        }
    };

    if (!post) {
        return <div>Loading...</div>
    }

    return (
        <div className="bg-white py-16 sm:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <article>
                    <header className="text-center mb-16">
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink mb-4 leading-tight">
                            {post.title}
                        </h1>
                        <p className="font-sans text-base text-gray-500">{post.date}</p>
                    </header>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Table of Contents */}
                        <aside className="lg:w-1/4 lg:sticky top-24 self-start">
                            <div className="p-6 bg-[#f5f5f0] rounded-lg shadow-sm">
                                <h2 className="font-serif text-xl text-ink mb-4">Table of Contents</h2>
                                <nav>
                                    {post.headings && post.headings.map((h) => (
                                        <TocEntry
                                            key={h.slug}
                                            heading={h}
                                            isVisible={activeHeading === h.slug}
                                            scrollTo={scrollTo}
                                        />
                                    ))}
                                </nav>
                            </div>
                        </aside>

                        {/* Article Content */}
                        <main className="lg:w-3/4">
                             <div
                                className="prose lg:prose-xl max-w-none font-sans text-gray-800"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                        </main>
                    </div>
                </article>
            </div>
        </div>
    );
}

// This function gets the static paths for all the research articles.
export async function getStaticPaths() {
    // Also fetch 'date' so the sort function in getAllPosts doesn't fail
    const posts = getAllPosts(['slug', 'date']);
    return {
        paths: posts.map((post) => {
            return {
                params: {
                    slug: post.slug,
                },
            }
        }),
        fallback: false,
    };
}

// This function gets the static props for a single research article.
export async function getStaticProps({ params }) {
    const post = getPostBySlug(params.slug, [
        'title',
        'date',
        'slug',
        'content',
    ]);

    const content = post.content || '';

    const headings = [];
    const headingRegex = /<h([1-3]) id="([^"]+)">(.+?)<\/h\1>/g;
    let match;
    while ((match = headingRegex.exec(content)) !== null) {
        headings.push({
            level: parseInt(match[1], 10),
            slug: match[2],
            text: match[3].replace(/<[^>]*>?/gm, ''), // Strip any inner HTML from heading text
        });
    }

    return {
        props: {
            post: {
                ...post,
                content,
                headings,
            },
        },
    };
}
