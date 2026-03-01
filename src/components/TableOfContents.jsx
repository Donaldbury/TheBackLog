import React, { useEffect, useState } from 'react';
import './TableOfContents.css';

function TableOfContents({ content }) {
    const [headings, setHeadings] = useState([]);
    const [activeId, setActiveId] = useState('');

    // Parse markdown content to find H2 and H3 headings
    useEffect(() => {
        if (!content) return;

        // Match lines starting with ## or ###
        const headingLines = content.split('\n').filter(line => line.match(/^##\s|^###\s/));

        const parsedHeadings = headingLines.map(line => {
            const level = line.startsWith('###') ? 3 : 2;
            const text = line.replace(/^#+\s/, '').trim();
            // Generate a slug ID compatible with react-markdown's typical heading ids
            const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

            return { id, text, level };
        });

        setHeadings(parsedHeadings);
    }, [content]);

    // Set up IntersectionObserver to track which heading is currently in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '0px 0px -80% 0px' }
        );

        const headingElements = document.querySelectorAll('h2, h3');
        headingElements.forEach((element) => observer.observe(element));

        return () => {
            headingElements.forEach((element) => observer.unobserve(element));
        };
    }, [headings]); // Re-run when headings change

    if (headings.length === 0) return null;

    return (
        <nav className="toc-container">
            <h4 className="toc-title">Table of Contents</h4>
            <ul className="toc-list">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        className={`toc-item level-\${heading.level} \${activeId === heading.id ? 'active' : ''}`}
                    >
                        <a
                            href={`#\${heading.id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default TableOfContents;
