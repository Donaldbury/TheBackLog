import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { blogPosts } from '../data/blogData';
import PageTransition from '../components/PageTransition';
import './BlogList.css';

function BlogList() {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language || 'en';
    const [selectedTag, setSelectedTag] = useState(null);

    // Convert object to array and sort posts from most recent to oldest
    const postsArray = Object.keys(blogPosts).map(slug => {
        const rawPost = blogPosts[slug];
        const localeData = rawPost.locales[currentLang] || rawPost.locales['en'];
        return {
            slug,
            date: rawPost.date,
            tags: rawPost.tags,
            title: localeData.title,
            excerpt: localeData.excerpt
        };
    });

    const sortedPosts = postsArray.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Extract all unique tags from the blog posts
    const allTags = Array.from(new Set(postsArray.flatMap(post => post.tags || [])));

    // Filter posts if a tag is selected
    const filteredPosts = selectedTag
        ? sortedPosts.filter(post => post.tags && post.tags.includes(selectedTag))
        : sortedPosts;

    return (
        <PageTransition>
            <section className="blog-list">
                <h1>{t('blog.list_title')}</h1>

                {allTags.length > 0 && (
                    <div className="tag-filter-container">
                        <button
                            className={`tag-pill ${selectedTag === null ? 'active' : ''}`}
                            onClick={() => setSelectedTag(null)}
                        >
                            All
                        </button>
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                className={`tag-pill ${selectedTag === tag ? 'active' : ''}`}
                                onClick={() => setSelectedTag(tag)}
                            >
                                #{tag}
                            </button>
                        ))}
                    </div>
                )}

                <ul>
                    {filteredPosts.map((post) => (
                        <li key={post.slug} className="post-item">
                            <Link to={`/blog/${post.slug}`} className="post-link">
                                <h2 className="post-title">{post.title}</h2>
                                <p className="post-date">{post.date}</p>
                                <p className="post-excerpt">{post.excerpt}</p>
                                {post.tags && (
                                    <div className="post-tags-list">
                                        {post.tags.map(tag => <span key={tag} className="post-tag">#{tag}</span>)}
                                    </div>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </PageTransition>
    );
}

export default BlogList;
