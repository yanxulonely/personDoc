import React, { forwardRef, useImperativeHandle, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Prism from 'prismjs';
import { message } from 'antd';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import './styles.css';

interface MarkdownViewerProps {
  content: string;
}

export interface MarkdownViewerRef {
  copyOriginalText: () => Promise<void>;
  copyPlainText: () => Promise<void>;
  copyFormattedHtml: () => Promise<void>;
}

const MarkdownViewer = forwardRef<MarkdownViewerRef, MarkdownViewerProps>(({ content }, ref) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  useImperativeHandle(ref, () => ({
    // 复制原始Markdown文本
    copyOriginalText: async () => {
      try {
        await navigator.clipboard.writeText(content);
        message.success('已复制原始文本');
      } catch (err) {
        message.error('复制失败');
      }
    },

    // 复制转换后的纯文本
    copyPlainText: async () => {
      try {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        const plainText = tempDiv.textContent || tempDiv.innerText;
        await navigator.clipboard.writeText(plainText);
        message.success('已复制纯文本');
      } catch (err) {
        message.error('复制失败');
      }
    },

    // 复制带格式的HTML
    copyFormattedHtml: async () => {
      try {
        const markdownContainer = document.querySelector('.markdown-viewer');
        if (markdownContainer) {
          const html = markdownContainer.innerHTML;
          await navigator.clipboard.writeText(html);
          message.success('已复制带格式的文本');
        }
      } catch (err) {
        message.error('复制失败');
      }
    }
  }));

  return (
    <div className="markdown-viewer">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <pre className={className}>
                <code className={className} {...props}>
                  {String(children).replace(/\n$/, '')}
                </code>
              </pre>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
});

MarkdownViewer.displayName = 'MarkdownViewer';

export default MarkdownViewer; 