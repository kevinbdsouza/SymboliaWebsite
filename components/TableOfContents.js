import { useEffect, useRef } from 'react';

export default function TableOfContents({ title, toc, activeId, onLinkClick }) {
  const activeLinkRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // This new, safe useEffect handles auto-scrolling the ToC list
  useEffect(() => {
    const activeElement = activeLinkRef.current;
    const scrollContainer = scrollContainerRef.current;

    if (!activeElement || !scrollContainer) return;

    // Check if the active element is outside the scroll container's visible area
    const containerRect = scrollContainer.getBoundingClientRect();
    const activeRect = activeElement.getBoundingClientRect();

    const isVisible = (activeRect.top >= containerRect.top) && (activeRect.bottom <= containerRect.bottom);

    // Only scroll if the element is NOT visible
    if (!isVisible) {
      activeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeId]); // This effect runs only when the activeId changes

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    if (onLinkClick) {
      onLinkClick(id);
    }
  };

  return (
    // This root div is now the scrollable container
    <div
      ref={scrollContainerRef}
      className="p-6 bg-[#f5f5f0] border border-gray-200 rounded-lg shadow-sm overflow-y-auto max-h-[calc(100vh-6.5rem)]"
    >
      {title && (
         <h3 className="font-serif text-2xl text-ink mb-6 pb-4 border-b border-gray-300">{title}</h3>
      )}
      <nav>
        <ul>
          {toc.map((item) => {
            const isActive = item.id === activeId;
            return (
              <li key={item.id} className={`py-1 ${item.level === 3 ? 'pl-4' : ''}`}>
                <a
                  ref={isActive ? activeLinkRef : null}
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className={`block transition-colors duration-150 ${
                    isActive ? 'font-medium text-accent' : 'text-gray-500 hover:text-accent'
                  }`}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}