import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import './styles.css';

export interface MarkdownViewerRef {
  getContent: () => string;
}

interface Props {
  filePath?: string;
  content?: string;
}

const MarkdownViewer = forwardRef<MarkdownViewerRef, Props>(({ filePath, content }, ref) => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    if (content) {
      setMarkdown(content);
    } else if (filePath) {
      fetch(filePath)
        .then(response => response.text())
        .then(text => setMarkdown(text))
        .catch(error => {
          console.error('Error loading markdown file:', error);
          setMarkdown('加载文档失败，请稍后重试...');
        });
    }
  }, [filePath, content]);

  useImperativeHandle(ref, () => ({
    getContent: () => markdown
  }));

  return (
    <div className="markdown-viewer">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ className, children }) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const isInline = !className;
            
            return !isInline ? (
              <SyntaxHighlighter
                style={vscDarkPlus as any}
                language={language}
                PreTag="div"
                showLineNumbers={true}
                wrapLines={true}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className}>
                {children}
              </code>
            );
          }
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
});

MarkdownViewer.displayName = 'MarkdownViewer';

export default MarkdownViewer; 