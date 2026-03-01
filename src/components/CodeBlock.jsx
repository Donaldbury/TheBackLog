import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy } from 'lucide-react';
import './CodeBlock.css';

const CodeBlock = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        const code = String(children).replace(/\n$/, '');
        navigator.clipboard.writeText(code);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    if (!inline && match) {
        return (
            <div className="code-block-wrapper">
                <div className="code-block-header">
                    <span className="code-language">{match[1]}</span>
                    <button onClick={handleCopy} className="copy-button" aria-label="Copy code">
                        {isCopied ? <Check size={16} color="#4ade80" /> : <Copy size={16} />}
                    </button>
                </div>
                <SyntaxHighlighter
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                    className="syntax-highlighter"
                    {...props}
                >
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            </div>
        );
    }

    // Fallback for inline code or code blocks without a specified language
    return (
        <code className={className} {...props}>
            {children}
        </code>
    );
};

export default CodeBlock;
