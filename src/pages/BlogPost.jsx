import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'react-i18next';
import { Clock, ThumbsUp } from 'lucide-react';
import { blogPosts } from '../data/blogData';
import CodeBlock from '../components/CodeBlock';
import TableOfContents from '../components/TableOfContents';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import './BlogPost.css';

function BlogPost() {
  const { t, i18n } = useTranslation();
  const { slug } = useParams();
  const rawPost = blogPosts[slug];
  const currentLang = i18n.language || 'en';

  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  // Initialize and load likes from localStorage
  useEffect(() => {
    if (slug) {
      const storedLikes = localStorage.getItem(`likes_${slug}`);
      if (storedLikes) {
        setLikes(parseInt(storedLikes, 10));
      }
      const userHasLiked = localStorage.getItem(`hasLiked_${slug}`);
      if (userHasLiked) {
        setHasLiked(true);
      }
    }
  }, [slug]);

  const handleLike = () => {
    if (!hasLiked) {
      const newLikes = likes + 1;
      setLikes(newLikes);
      setHasLiked(true);
      localStorage.setItem(`likes_${slug}`, newLikes.toString());
      localStorage.setItem(`hasLiked_${slug}`, 'true');
    }
  };

  // Calculate Reading Time
  const calculateReadingTime = (text) => {
    const wpm = 225; // Average reading speed
    const words = text ? text.trim().split(/\s+/).length : 0;
    const time = Math.ceil(words / wpm);
    return time || 1; // Minimum 1 minute
  };

  if (!rawPost) {
    return (
      <div className="blog-post-container">
        <Link to="/blog" className="back-link">{t('blog.back')}</Link>
        <article className="blog-post-article">
          <h1>Post Not Found</h1>
          <p className="post-content">Sorry, but the log you are looking for doesn't exist.</p>
        </article>
      </div>
    );
  }

  const localeData = rawPost.locales[currentLang] || rawPost.locales['en'];
  const post = {
    date: rawPost.date,
    title: localeData.title,
    content: localeData.content,
    tags: rawPost.tags || []
  };

  // Function to find related posts
  const getRelatedPosts = () => {
    const allPosts = Object.keys(blogPosts)
      .filter(s => s !== slug) // Don't include current post
      .map(s => {
        const p = blogPosts[s];
        const sharedTags = p.tags.filter(tag => post.tags.includes(tag)).length;
        const pLocaleData = p.locales[currentLang] || p.locales['en'];
        return {
          slug: s,
          title: pLocaleData.title,
          sharedTags,
          date: p.date
        };
      })
      .filter(p => p.sharedTags > 0)
      .sort((a, b) => b.sharedTags - a.sharedTags)
      .slice(0, 3);

    return allPosts;
  };

  const relatedPosts = getRelatedPosts();

  return (
    <div className="blog-post-container">
      <Link to="/blog" className="back-link">{t('blog.back')}</Link>

      <div className="blog-post-layout">
        <article className="blog-post-article">
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span>{t('blog.published')} {post.date}</span>
            <span className="reading-time">
              <Clock size={14} className="icon" />
              {calculateReadingTime(post.content)} min read
            </span>
          </div>
          <div className="post-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSlug]}
              components={{
                code: CodeBlock
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          <div className="post-footer">
            <div className="like-section">
              <button
                className={`like-button ${hasLiked ? 'liked' : ''}`}
                onClick={handleLike}
                disabled={hasLiked}
              >
                <ThumbsUp size={20} />
                <span>{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
              </button>
              {hasLiked && <p className="thank-you-note">Thanks for the support!</p>}
            </div>

            {relatedPosts.length > 0 && (
              <div className="related-posts">
                <h3>Read Next</h3>
                <div className="related-grid">
                  {relatedPosts.map(rp => (
                    <Link key={rp.slug} to={`/blog/${rp.slug}`} className="related-card border-card">
                      <h4>{rp.title}</h4>
                      <p>{rp.date}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        <aside className="blog-post-sidebar">
          <TableOfContents content={post.content} />
        </aside>
      </div>
    </div>
  );
}

export default BlogPost;
